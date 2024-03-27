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
        always {
            echo 'Slack Notifications .'
            slackSend channel: '#graduation-project',
                color: COLOR_MAP[currentBuild.currentResult],
                message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
        }
    }
}