#!/bin/bash

echo "开始部署"
cd build
rm -rf ccweb_new.tar.gz
tar -czvf ccweb_new.tar.gz *
echo "上传数据"
scp ccweb_new.tar.gz root@119.18.193.20:/home/ccweb_new/
ssh root@119.18.193.20 'bash /home/build_ccweb_new_monitor.sh'
date
echo "Monitor环境部署完成"