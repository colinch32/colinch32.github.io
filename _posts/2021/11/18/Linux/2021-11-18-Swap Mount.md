---
layout: post
title: "[리눅스] Swap 과 Mount"
description: " "
date: 2021-11-18
tags: [리눅스]
comments: true
share: true
---

1. EC2 Redhat 7.5 생성

   - EC2 시작하기 -> AWS Marketplace -> rhel for sap (이전버전 7.5)

     > AWS Marketplace Subscription에서 redhat 구독 필수

   - 이후 명세서에 맞춰 생성

2. Bastion 통해서 EC2 접속

   - pem을 이용하여 Bastion 접속
   - root 권한x, ec2-user로 접속

   ```
   ssh -i "접속할_ec2_key_이름.pem" -p 포트넘버 ec2-user@localhost
   ```

   ```
   yum update -y
   uname -a						커널 버전 확인
   ```

3. 보안 작업

   ```
   cd /etc
   vi log
   chage -l ec2-user				보안 확인
   ```

   ```
   vi /etc/login.efs				보안 변경
   ```

   ```yaml
   MAX_DAYS 90
   MIN_DAYS 1
   LEN 8
   AGE 14
   ```



# Swap

> Disk를 메모리처럼 사용하여 메모리가 부족한 경우 에러 방지

- 파티션 나누기		--> 명령어 방법도 있지만 잘 사용하지 않음

  > https://bono915.tistory.com/147

	###### 관련 명령어
	
	```
	lsblk						디스크 확인
	swapon -s					현재 사용하고 있는 Swap 파티션 확인
	```
	
	```
	fdisk	/dev/nvme~			파티션 디스크 생성 및 추가
		p
		n						new
		(l)						local
		enter enter				파티션 시작 - 끝 (enter == 처음부터 끝까지)
		p						현재 파티션 (일반 디스크)
		t						type 변경
		82						스왑 파티션 지정
		p						현재 파티션 확인
		w						현재 설정 저장
		
	mkswap	/dev/nvme~			생성한 파티션을 swap으로 포멧
	```
	
	```
	free	-m					메모리 정보 확인
	swapon	/dev/nvme~			swap 키기
	```
	
	```
	vi /etc/fstab
		/dev/nvme	swap	swap	defaults	0 0
	```
	
	

# Mount

- mount 전 폴더 생성

###### 관련 명령어

```
mkfs.xfs -f	/dev/nvme~			원하는 디스크 사용
mount	/dev/nvme	/usr/sap	mount하는 disk -> 폴더
umount	/dev/nvme				해당하는 disk mount 해제
```

```yaml
vi	/etc/fstab					파일 시스템 테이블, 부팅시 마운트 정보
	디스크			폴더		 xfs	 defaults 	 0 0
	/dev/nvme~	/usr/sap	xfs		defaults	0 0
```

```
df -Th							디스크 확인
```



## Limit 해제

- root 권한

