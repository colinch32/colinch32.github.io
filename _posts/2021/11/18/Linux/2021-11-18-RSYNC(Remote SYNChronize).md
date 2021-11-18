---
layout: post
title: "[리눅스] RSYNC(Remote SYNChronize)"
description: " "
date: 2021-11-18
tags: [리눅스]
comments: true
share: true
---

## RSYNC(Remote SYNChronize)

File/Directory를 백업/동기화

```
rsync [option] LOCAL_SOURCE_DIR/ USER_NAME@HOST_NAME:REMOTE_DIR/
```

로컬 디렉토리: LOCAL_SOURCE_DIR/

원격 디렉토리: USER_NAME@HOST_NAME:REMOTE_DIR/

 



### 옵션

```
rsync -avh  [source] [destination]
```

 

| short | long        | 설명                                                         |
| ----- | ----------- | ------------------------------------------------------------ |
| -a    | --archive   | 자주 사용하는 옵션을 묶어놓은 옵션(= -rlptgoD)               |
| -r    | --recursive | 하위 디렉토리까지 복사                                       |
| -l    | --links     | 심볼릭 링크 유지하면서 동기화                                |
| -p    | --perms     | 퍼미션 정보 유지하면서 동기화                                |
| -t    | --times     | 타임스탬프 유지하면서 동기화                                 |
| -g    | --group     | 그룹 소유권 보존                                             |
| -o    | --owner     | 소유권 보존                                                  |
| -D    |             | 디바이스 파일 보존                                           |
| -h    |             | 결과를 사람이 읽기 편한 포맷으로 출력                        |
| -v    | --verbose   | 동기화 시 상세 정보를 표시                                   |
| -q    | --quiet     | 동기화 시 상세 정보를 표시 하지 않음.                        |
|       | --delete    | 원본 소스에 없는 파일은 백업 서버에서 삭제                   |
|       | --exclude   | 제외할 파일 지정 (ex: --exclude='*.cnf' --exclude='abc.php') |
|       | --include   | 포함할 파일 지정(ex: .pdf파일만 전송해라 ==> --include="*/" --include="*.pdf" --exclude="*" ) |
| -n    | --dry-run   | 실제 파일 복사를 하는것이 아니라, 처리될 대상 파일 목록만 출력 |
| -b    | --backup    | 백업서버에 이미 파일이 존재할경우 백업 디렉토리에 백업       |
| -u    | --update    | 백업서버에 원본보다 최신 파일이 있을 경우 해당 파일은 복사하지 않음. |
| -e    |             | ssh를 10000 port를 사용한다면 (ex: -e 'ssh -p 100000')       |
| -z    |             | 데이터 파일을 압축                                           |

