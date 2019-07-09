pipeline {
    agent any
    def Namespace = "default"
    def ImageName = "mati92/product"
    def DockerhubCred = "dockerhub"
    stages {
        stage('Checkout') {
            checkout scm
            sh "git rev-parse --short HEAD > .git/commit-id"
            imageTag= readFile('.git/commit-id').trim()
        }
        stage('Environment') {
            sh 'git --version'
            echo "Branch: ${env.BRANCH_NAME}"
            sh 'docker -v'
            sh 'printenv'
        }
        stage('Build Docker test'){
            sh "docker build -t ${ImageName}:${imageTag}-test -f Dockerfile.test --no-cache ."
        }
        stage('Docker test'){
            sh "docker run --rm ${ImageName}:${imageTag}-test"
        }
        stage('Clean Docker test'){
            sh "docker rmi ${ImageName}:${imageTag}-test"
        }
        stage('Build Docker for development'){
            when {
                branch 'develop' 
            }
            steps {
                ImageName = ImageName + "_dev" // set new ImageName for develop
                Namespace = "develop" // set new Namespace for develop
                withDockerRegistry([credentialsId: "${DockerhubCred}", url: 'https://index.docker.io/v1/']) {
                    sh "docker build -f Dockerfile.local -t ${ImageName}:${imageTag} --no-cache ."
                    sh "docker push ${ImageName}:${imageTag}"
                }
            }
        }
        stage('Build Docker for production'){
            when {
                branch 'master' 
            }
            steps {
                withDockerRegistry([credentialsId: "${DockerhubCred}", url: 'https://index.docker.io/v1/']) {
                    sh "docker build -t ${ImageName}:${imageTag} --no-cache ."
                    sh "docker push ${ImageName}:${imageTag}"
                }
            }
        }
        stage('Deploy on K8s for development'){
            when {
                branch 'develop' 
            }
            steps {
                sh  script: """
                    set +e
                    helm install --name product --namespace ${Namespace} --set image.repository=${ImageName} --set image.tag=${imageTag} ./charts
                    set -e
                    """
                // update to New version
                sh "helm upgrade --wait --namespace ${Namespace} --set image.repository=${ImageName} --set image.tag=${imageTag} product ./charts"
            }
        }
        stage('Deploy on K8s for production'){
            when {
                branch 'master' 
            }
            steps {
                sh  script: """
                    set +e
                    helm install --name product --namespace ${Namespace} --set image.repository=${ImageName} --set image.tag=${imageTag} ./charts
                    set -e
                    """
                // update to New version
                sh "helm upgrade --wait --namespace ${Namespace} --set image.repository=${ImageName} --set image.tag=${imageTag} product ./charts"
            }
        }

    }
}
