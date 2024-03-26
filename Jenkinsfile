pipeline{

    agent {label 'FRONT'}

    stages{

        // Fetching The Newest Updates From The Repo
        stage('Git Checkout'){

            steps {

                git branch: 'development' , url: 'https://github.com/ahmed-zhran/Intern-Hub-Frontend.git'
            }
        }

        // Building The App With NPm
        stage('NPM Build'){

            steps {

                withNPM(npmrcConfig: 'my-custom-nprc') {
                        sh 'npm run build'
                }
            }
        }
    }
}