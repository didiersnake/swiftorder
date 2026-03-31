pipeline {

    agent any

    stages {
        // stage('Build') {
        //     steps {
        //         echo 'Building..'
        //     }
        // }
        stage('Cleanup') {
            steps {
                echo 'Cleanup...'
                // sh 'cd swiftorder'
                sh 'docker compose down'
            }
        }
        stage('Build & Deploy') {
            steps {
                echo 'Deploying....'
                // sh 'cd swiftorder'
                sh 'docker compose up -d --build'
            }
        }
    }

    post {
        always {
            echo 'pipeline finished'
        }
       
    }


}