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
}