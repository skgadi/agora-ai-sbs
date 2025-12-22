docker build -t agora-ai-sbs .
docker login
docker tag agora-ai-sbs:latest skgadi/agora-ai-sbs:latest
docker push skgadi/agora-ai-sbs:latest