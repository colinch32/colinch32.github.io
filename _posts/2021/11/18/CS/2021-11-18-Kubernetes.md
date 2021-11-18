---
layout: post
title: "[CS] Kubernetes"
description: " "
date: 2021-11-18
tags: [CS]
comments: true
share: true
---

### **Kubernetes**

컨테이너 운영환경에서 컨테이너들을 적절하게 매니징하는 솔루션, 대표적인 컨테이너 **오케스트레이션** 툴

> **컨테이너 오케스트레이션(Container Orchestration)**
> https://velog.io/@modolee/kubernetes-newbie-guide-01
> \- 여러 컨테이너 배포 프로세스를 최적화하는 자동화 도구
> \- 복잡한 컨테이너 환경을 효과적으로 관리 ▶ 서버 관리자의 역할을 대신하는 프로그램
>
> **특징**
> \- 클러스터(Cluster)
>  ◽ 중앙 제어(master-node): 클러스터 관리를 위한 마스터 노드를 두고 마스터 노드가 클러스터에 명령을 내림
>    ▶ 관리자는 마스터 노드만 관리하여 다른 클러스터를 관리해야 함
>    🕑 기존에는 서버 관리자가 각 서버 스펙, 리소스 상태, 애플리케이션 구동 등을 직접 체크 ➡ 추상화 된 클러스터로 관리
>  ◽ 네트워킹: 클러스터 내에서 가상 네트워킹을 통해 노드 간에 네트워킹이 원할하게 이루어져야 함
>  ◽ 노드 스케일: 클러스터 내에 컨테이너가 무한히 증가하더라도 관리가 가능해야 함
> \- 상태(State) 관리
>   ◽ 원하는 상태(ex 컨테이너 수량)를 설정하는 것만으로 별도의 명령 없이 해당 상태로 변경
>   ◽ 장애발생 시, 설정 된 상태를 유지하기 위한 명령어가 자동으로 실행되어야 함
> \- 배포 관리(Scheduling)
>   ◽ 유휴 리소스 관리 ➡ 새로운 컨테이너 생성 시 알맞은 서버에 배치
>   ◽ 추가 리소스가 필요한 경우 리소스를 할당하여 컨테이너 배치
> \- 배포 버전 관리(Rollout / Rollback)
>   ◽ 배포 시 중앙에서 자동 배포 진행(개별 배포X), 중앙에서 일괄적 롤백
> \- 서비스 등록 및 조회(Service Discovery)
>   ◽ 새로운 서비스가 추가된 경우 자동으로 해당 서비스에 대한 설정 추가
>   ◽ 프록시 서버는 설정 저장소를 바라보며 설정이 변경 된 경우 프로세스 재시작을 통해 새 설정 반영
> \- 볼륨 스토리지(Volume)
>  ◽ 각 켄터이너 별 볼륨 관리를 추상적인 레벨에서 손쉽게 관리

▶ 쿠버네티스는 위와 같은 컨테이너 오케스트레이션 특징 수행
ex) 스케쥴링, 상태 체크, 컨테이너 리소스 모니터링, 컨테이너 삭제 관리 등



#### **쿠버네티스 구조**

**1. 클러스터 구조**

◽ 1개의 마스터 - 여러개의 노드 구조

**2. 쿠버네티스 오브젝트**

◽ 오브젝트: yaml이나 json으로 정의된 스펙에 따라 만들어지는 객체

```
# pod_example.yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.7.9
    ports:
    - containerPort: 8090
```

> 👉 기본 오브젝트 종류
> **1. Pod**
> \- 가장 기본적인 배포 단위
> \- 컨테이너들을 포함
>
> **2. Volume**
> \- 컨테이너 외부 디스크
> \- 컨테이너가 재실행되어도 Volue을 사용하면 파일 유지
>
> **3. Service**
> \- 여러 개의 Pode 서비스 시, 현재 요청이 어느 Pod로 갈지 선택하는 오브젝트
> \- 로드밸런서
>
> **4. Controller**
> \- 여러 개의 Pod 배포를 적절하게 관리하는 오브젝트
> \- Pod 생성, 삭제 (Replication Controller, Replication Set)
> \- Deployment

◽ 그 외 구조

\- 네임 스페이스: 한 클러스터 내의 논리적 분리 단위
ex) namesapce:billing과 namespace:commerce는 가튼 클러스터 내에 있지만 논리적으로 분리

\- 라벨: 리소스를 선택할 때 사용

◽ Pod 라벨: my app

```
kind: Pod
...
metadata:
  labels:
    app: myapp
```

◽ Selector로 Pod 선택

```
kind: Service
...
spec:
  selector:
    app: myapp
```



#### **아키텍처**

마스터

쿠버네티스 클러스터 전체를 컨트롤하는 시스템

◽ API 서버: 모든 명령과 통신을 REST API로 제공

◽ Etcd: 분산형 키-벨류 스토어, 쿠버네티스 클러스터 상태나 설정 정보 저장

◽ 스케쥴러: Pod, Service 등 각 리소스를 적절한 노드에 할당

◽ 컨트롤러 매니저: 컨트롤러들을 생산, 배포 등 관리

◽ DNS: 동적으로 생성되는 Pod, Service 등 IP를 담는 DNS

노드

마스터에 의해 명령을 받고 실제 서비스하는 컴포넌트

◽ Kubelet: 마스터 API 서버와 통신하는 노드 에이전트

◽ Kube-proxy: 노드로 오는 네트워크 트래픽을 적절한 컨테이너로 라우팅, 네트워크 트래픽 프록시 등 노드-마스터간 네트워크 통신 관리

◽ Container runtime: 컨테이너 실행 ex) docker

◽ cAvisor: 각 노드 내 모니터링 에이전트, 노드 내 컨테이너들의 상태, 성능을 수집하여 마스터 API서버에 전달