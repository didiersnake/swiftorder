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
                sh 'docker-compose up down'
            }
        }
        stage('Build & Deploy') {
            steps {
                echo 'Deploying....'
                // sh 'cd swiftorder'
                sh 'docker-compose up -d --build'
            }
        }
    }

    post {
        always {
            echo 'pipeline finished'
        }
        // failure {
        //     mail(to: 'didier.djakoua@gmail.com',
        //     subject: "Failed Pipeline",
        //     body: "Something is wrong with ${currentBuild.currentResult}")
        // }
    }


}