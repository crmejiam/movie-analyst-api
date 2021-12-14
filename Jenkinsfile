pipeline { 
    agent any
    tools {nodejs "nodejs"}
    options {
        skipStagesAfterUnstable()
    }
    environment{
        imageName = "crmejiam/rampup-backend"
        dockerCredentials = 'd08b1f0a-4cd6-4f33-b7f5-a9414a07f3ef'
        backImage = ''
        ansibleIP = '10.1.5.153'
        ansiblePort = '5000'
    }
    stages {
        stage('Test'){
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                script {
                    backImage = docker.build(imageName)
                }
                sh 'ls -l'
            }
        }
        stage('Push') {
            steps {
                script {
                        docker.withRegistry('', dockerCredentials) {
                            backImage.push()
                    }
                }
            }
        }
        stage('Clean') {
            steps {
                sh 'docker rmi $imageName'        // There's no plugin method to remove docker images
                sh 'ls -l'
            }
        }
        stage('Deploy') {
            steps {
                sh 'curl http://$ansibleIP:$ansiblePort/update/backend'
            }
        }
    }
} 