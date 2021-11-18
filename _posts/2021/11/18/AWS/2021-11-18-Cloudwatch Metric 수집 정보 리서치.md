---
layout: post
title: "[AWS] Metric 수집 정보 리서치"
description: " "
date: 2021-11-18
tags: [AWS]
comments: true
share: true
---

# Metric 수집 정보 리서치

## 서비스별 Cloudwatch Metric 정보

- Cloudwatch Metric이란?

  > CloudWatch에 게시된 시간 순서별 데이터 요소 세트
  >
  > Metric = 모니터링 변수
  >
  > data = 시간의 경과에 따른 해당 변수 값
  >
  > JSON 형태



### EC2

> https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/viewing_metrics_with_cloudwatch.html

- CloudWatch agent 추가 지표

  > https://docs.aws.amazon.com/ko_kr/AmazonCloudWatch/latest/monitoring/metrics-collected-by-CloudWatch-agent.html
  
- 향상된 모니터링 여부

  > 5분 모니터링 -> 1분 모니터링 단축 가능

  

### RDS

> https://docs.aws.amazon.com/ko_kr/AmazonRDS/latest/UserGuide/MonitoringOverview.html

- 향상된 모니터링 여부

  > https://docs.aws.amazon.com/ko_kr/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.html

  - 인스턴스 에이전트: 측정치 수집

  - 하이퍼바이저 계층: 소량의 작업 수행

    :heavy_division_sign: 측정치 간의 차이점 확인

  - DB 인스턴스의 여러 프로세스 또는 스레드에서 CPU를 사용하는 방법을 확인하려는 경우에 유용

  - 50개가 넘는 CPU, 메모리, 파일 시스템 및 디스크 I/O 지표에 액세스가능

  

### REDIS

> https://docs.aws.amazon.com/ko_kr/AmazonElastiCache/latest/red-ug/CacheMetrics.Redis.html

- 향상된 모니터링 여부
  - 클러스터드 모드 비활성화: 더 큰 캐시 인스턴스 유형 사용하여 확장
  - 클러스터드 모드 활성화: 샤드를 추가하여 쓰기 워크로드를 기본 노드 전체에 더 많이 배포

### DocumentDB

> MongoDB와 호환되는 빠르고 안정적인 종합 관리형 데이터베이스
>
> https://docs.aws.amazon.com/ko_kr/documentdb/latest/developerguide/cloud_watch.html

- 향상된 모니터링 여부:x:



### MSK

> Managed Streaming for Apache Kafka, 스트리밍 데이터 처리 앱 구축 및 실행 관소화 완전 관리형 서비스
>
> https://docs.aws.amazon.com/msk/latest/developerguide/monitoring.html

- 향상된 모니터링 여부

  > https://docs.aws.amazon.com/msk/1.0/apireference/clusters.html#clusters-prop-createclusterrequest-enhancedmonitoring

  - Amazon CloudWatch로 보내는 Apache Kafka 지표 지정
    - DEFAULT
    - PER_BROKER
    - PER_TOPIC_PER_BROKER



### Keyspace

> 관리형 데이터베이스 서비스
>
> https://docs.aws.amazon.com/keyspaces/latest/devguide/metrics-dimensions.html

- 향상된 모니터링 여부

  > 자동화 모니터링 도구, 수동화 모니터링 도구 설명 https://docs.aws.amazon.com/keyspaces/latest/devguide/monitoring-automated-manual.html

  - 수동 모니터링 도구
    - **맞춤형 대시 보드** 설정 가능



### API Gateway

> https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-metrics-and-dimensions.html

- 개별 API 호출 로깅 가능

  

### ALB

> https://docs.aws.amazon.com/ko_kr/elasticloadbalancing/latest/application/load-balancer-cloudwatch-metrics.html

- 향상된 모니터링 여부 :x: