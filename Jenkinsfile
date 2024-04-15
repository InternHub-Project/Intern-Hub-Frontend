def COLOR_MAP = [
    'SUCCESS' : 'good',
    'FAILURE' : 'danger',
]


pipeline{

    agent {label 'FRONT'}

    tools {
        nodejs 'NODE18'
    }

    stages{

        // Installing Dependancies With NPM
        stage('NPM Install'){
            steps {
                    sh 'npm install'
            }
        }


        // Building The App With NPM
        stage('NPM Build'){

            steps{
                    sh 'npm run build'
            }

        }
    }

    post {
        success {
            echo 'Slack Notifications .'
            slackSend channel: 'internhub-frontend',
                color: COLOR_MAP[currentBuild.currentResult],
                message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}"
            script {
                currentBuild.rawBuild.delete() // Delete build history when successful
            } 
        }

        failure {
            echo 'Slack Notifications .'
            slackSend channel: 'internhub-frontend',
                color: COLOR_MAP[currentBuild.currentResult],
                message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
        }

        aborted {
            echo 'Slack Notifications .'
            slackSend channel: 'internhub-frontend',
                color: COLOR_MAP[currentBuild.currentResult],
                message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
        }
    }
}
