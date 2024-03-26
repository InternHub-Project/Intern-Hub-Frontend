pipeline{

    agent {label 'FRONT'}

    tools {
        nodejs 'NODE18'
    }

    stages{

        // Fetching The Newest Updates From The Repo
        stage('Git Checkout'){

            steps {

                git branch: 'development' , url: 'https://github.com/ahmed-zhran/Intern-Hub-Frontend.git'
            }
        }

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