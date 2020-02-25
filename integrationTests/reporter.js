const testrailApi = require('testrail-api')
const constants = require('./constants.js')
const stripAnsi = require('strip-ansi')

const projectName = 'Jahia v8 Navigation - Integration Tests' // Must match project name in Testrail
const defaultMilestone = 'Default'
const defaultRunDescription = 'This jest run was manually triggered'
const runName = 'Automated Execution - ' + new Date().toString()

// The testrail API doc is located here: http://docs.gurock.com/testrail-api2/start

// This function is used to disable testrail is environment variables are not provided
const getTestrailApi = () => {
    if (
        process.env[constants.TESTRAIL_URL] !== undefined &&
        process.env[constants.TESTRAIL_USERNAME] !== undefined &&
        process.env[constants.TESTRAIL_PASSWORD] !== undefined
    ) {
        if (process.env[constants.TESTRAIL_MILESTONE] === undefined) {
            console.log(
                'WARNING: No milestone name provided (env var: TESTRAIL_MILESTONE), using: ' +
                    defaultMilestone,
            )
        }
        if (process.env[constants.TESTRAIL_RUNDESCRIPTION] === undefined) {
            console.log(
                'WARNING: No Run description provided (env var: TESTRAIL_RUNDESCRIPTION), using: ' +
                    defaultRunDescription,
            )
        }
        const apiObj = new testrailApi({
            host: process.env[constants.TESTRAIL_URL],
            user: process.env[constants.TESTRAIL_USERNAME],
            password: process.env[constants.TESTRAIL_PASSWORD],
        })
        return apiObj
    } else {
        console.log(
            'WARNING: No testrail variables provided (TESTRAIL_URL, TESTRAIL_USERNAME, TESTRAIL_PASSWORD), testrail is DISABLED',
        )
        return null
    }
}

/*
    This block of code is only there to show an error message may testrail credentials be incorrect otherwise jest just fails silently and it's pretty tough to find what's going on
*/
const api = getTestrailApi()
if (api !== null) {
    api.getProjects().catch(function(error) {
        console.log('error', error.message)
    })
}

/*
    Note: We don't create project by default, as a safeguard from gettings randomg projects created by code in our testrail platform
*/
const getTestrailProject = async (api, projectName) => {
    let projects = await api.getProjects()
    projects = projects.body
    const project = projects.find(p => p.name === projectName)
    if (project === undefined) {
        console.log('ERROR: Unable to find project: ' + projectName)
    }
    return project
}

const createTestrailMilestone = async (api, projectId, milestoneName) => {
    let milestones = await api.getMilestones(projectId)
    milestones = milestones.body
    let milestone = milestones.find(m => m.name === milestoneName)
    if (milestone === undefined) {
        milestone = await api.addMilestone(projectId, {
            name: milestoneName,
        })
        milestone = milestone.body
    }
    return milestone
}

const createTestrailRun = async (
    api,
    projectId,
    milestoneId,
    runName,
    runDescription,
    caseIds,
) => {
    console.log('Create run in testrail: ' + runName)
    let run = await api.addRun(projectId, {
        name: runName,
        milestone_id: milestoneId,
        description: runDescription,
        include_all: false,
        case_ids: caseIds,
    })
    run = run.body
    return run
}

const createSection = async (api, project, sectionName) => {
    let sections = await api.getSections(project.id)
    sections = sections.body
    let section = sections.find(se => se.name === sectionName)
    if (section === undefined) {
        console.log('Create section in testrail: ' + sectionName)
        section = await api.addSection(project.id, {
            name: sectionName,
        })
        section = section.body
    }
    return section
}

const getTestCases = async (api, project) => {
    let testcases = await api.getCases(project.id)
    testcases = testcases.body
    return testcases
}

const createTestcase = async (api, testcaseTitle, section, notes) => {
    console.log('Create Test Case in testrail: ' + testcaseTitle)
    let testcase = await api.addCase(section.id, {
        title: testcaseTitle,
        custom_status: 2, // Status: 2 ===> "Complete"
        custom_notes: notes,
    })
    testcase = testcase.body
    return testcase
}

//http://docs.gurock.com/testrail-api2/reference-results#add_result
const bulkAddResults = async (api, run, payload) => {
    let submittedResults = await api.addResultsForCases(run.id, payload)
    submittedResults = submittedResults.body
    return submittedResults
}

class TestrailReporter {
    constructor(globalConfig, options) {
        this._globalConfig = globalConfig
        this._options = options
    }
    async onRunComplete(contexts, results) {
        const apiObj = getTestrailApi()
        if (apiObj !== null) {
            const milestoneName =
                process.env[constants.TESTRAIL_MILESTONE] === undefined
                    ? defaultMilestone
                    : process.env[constants.TESTRAIL_MILESTONE]
            const runDescription =
                process.env[constants.TESTRAIL_RUNDESCRIPTION] === undefined
                    ? defaultRunDescription
                    : process.env[constants.TESTRAIL_RUNDESCRIPTION]
            const project = await getTestrailProject(apiObj, projectName)
            const milestone = await createTestrailMilestone(
                apiObj,
                project.id,
                milestoneName,
            )
            const sendResults = []
            for (const suiteResult of results.testResults) {
                // For each test suite, we create a section containing the ancestor
                if (suiteResult.testResults.length > 0) {
                    // Get ancestor title (the suite) for the first test result and use it as the section name
                    const section = await createSection(
                        apiObj,
                        project,
                        suiteResult.testResults[0].ancestorTitles[0],
                    )
                    const existingTestCases = await getTestCases(
                        apiObj,
                        project,
                    )
                    for (const testResult of suiteResult.testResults) {
                        let currentCase = existingTestCases.find(
                            c => c.title === testResult.title,
                        )
                        // If case doesn't already exists, we create it
                        if (currentCase === undefined) {
                            currentCase = await createTestcase(
                                apiObj,
                                testResult.title,
                                section,
                                'graphQL query',
                            )
                        }
                        sendResults.push({
                            case_id: currentCase.id,
                            status_id: testResult.status === 'passed' ? 1 : 5, //1 => Success, 5 => Fail
                            comment:
                                testResult.status === 'passed'
                                    ? 'Text executed successfully'
                                    : stripAnsi(testResult.failureMessages[0]), // The failure message contains terminal colors, which renders improperly when sent as string
                        })
                    }
                }
            }
            if (sendResults.length > 0) {
                const caseIds = sendResults.map(r => r.case_id)
                const run = await createTestrailRun(
                    apiObj,
                    project.id,
                    milestone.id,
                    runName,
                    runDescription,
                    caseIds,
                )
                const results = await bulkAddResults(apiObj, run, sendResults)
                console.log(
                    'Submitted: ' + results.length + ' results to testrail',
                )
            }
        }
    }
}
module.exports = TestrailReporter
