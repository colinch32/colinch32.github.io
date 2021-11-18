---
layout: post
title: "[AWS] AWS EC2 Windows 정품 인증 오류"
description: " "
date: 2021-11-18
tags: [AWS]
comments: true
share: true
---

#  AWS EC2 Windows 정품 인증 오류

## **상황 및 원인**



#### 상황

A 계정에서 AMI를 B 계정으로 공유한 후, B 계정에서 AMI로 EC2를 생성했을 때 Windows 정품 인증이 되지 않음

 

#### 원인

\- 인스턴스 내에 라이센스 정보를 포함하는 KMS 서버에 연결할 수 있어야 한다.

\- EC2가 배포된 Subnet 기반으로 Windows OS의 영구 정적 경로를 설정해줘야한다.

 

 



##  **해결방법**



자동 / 수동 방법이 있다.

[aws.amazon.com/ko/premiumsupport/knowledge-center/windows-activation-fails/](https://aws.amazon.com/ko/premiumsupport/knowledge-center/windows-activation-fails/)

[ Amazon EC2 Windows 인스턴스에서 Windows 정품 인증 실패 해결Windows 인스턴스는 정품 인증을 위해 Amazon Web Services(AWS)에서 Microsoft Key Management Service(KMS)를 사용합니다. 인스턴스에서 KMS 서버에 연결할 수 없는 경우 Windows 정품 인증 오류 메시지가 표시될 수aws.amazon.com](https://aws.amazon.com/ko/premiumsupport/knowledge-center/windows-activation-fails/)



해당 문서에 두 가지의 방법이 모두 나와있다.

 



### 자동화 방법

\- **AWS System Manager Automation**을 이용한다.

✔ 사용하는 문서

[docs.aws.amazon.com/systems-manager/latest/userguide/automation-awssupport-activatewindowswithamazonlicense.html](https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-awssupport-activatewindowswithamazonlicense.html)

[ AWSSupport-ActivateWindowsWithAmazonLicense - AWS Systems ManagerThe offline method requires that the provided EC2 instance be stopped and then started. Data stored in instance store volumes will be lost. The public IP address will change if you are not using an Elastic IP.docs.aws.amazon.com](https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-awssupport-activatewindowswithamazonlicense.html)



해당 링크를 클릭하면 바로 AWS System Manager Automation 자동화 생성 창으로 들어갈 수 있다.

 

📌 자동화 실행

\1. 해당 Document 링크에 접속한다.



![img](C:\Users\jihong.kim\OneDrive\TIL\AWS\image\img.png)



 [**Run this Automation (console)**]을 클릭하여 Windows License Document 자동화를 생성 창으로 이동한다.

 

\2. 자동화 문서를 생성한다.



![img](C:\Users\jihong.kim\OneDrive\TIL\AWS\image\img.png)



[간편한 실행] ▶ [대화형 인스턴스 선택기 보기] 활성화 ▶ 사용할 인스턴스 검색 ▶ [실행]

❗ EC2에 SSM이 접근 할 수 있는 IAM 권한을 설정해준다.



![img](C:\Users\jihong.kim\OneDrive\TIL\AWS\image\img.png)



\- EC2에 **AmazonSSMMnagedInstanceCore** 정책 추가

 

\3. 자동화가 생성 완료



![img](C:\Users\jihong.kim\OneDrive\TIL\AWS\image\img.png)



\- 실패가 떠서 라이센스 적용이 제대로 안된 건가 했는데, 라이센스는 제대로 적용되었다.

 



### 수동 방법

수동 방법으로는 실제로 실행을 안해봤다.

문서에 있는 대로 진행을 하면 된다.

 

📌 수동 방법 실행

**EC2Config를 업데이트하거나, EC2Launch 초기화 스크립트를 실행**

Windows Server 2016 이상의 경우: 다음 명령을 실행하여 AWS KMS 서버에 대한 올바른 라우팅 설정으로 해결

\1. Windows PowerShell을 관리자로 실행

\2. 다음 명령어 입력

```
PS C:>Import-Module "C:\ProgramData\Amazon\EC2-Windows\Launch\Module\Ec2Launch.psd1"
PS C:>Add-Routes
PS C:>Set-ActivationSettings
PS C:>slmgr /ato
```

 

❗ Windows가 여전히 정품 인증되지 않을 때는 문서에 있는 수동방법 - 2번부터 시작을 하면 된다.