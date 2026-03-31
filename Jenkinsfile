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
                sh 'docker container stop swiftorder'
                sh 'docker rm swiftorder'
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