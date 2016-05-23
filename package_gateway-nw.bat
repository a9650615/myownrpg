@rem 打包使用zip格式，生成xxx.nw的文件名，
del gateway-nw.nw
"D:\Program Files\7-Zip\7z.exe" a -tzip gateway-nw.nw -x!.git -x!html "%~dp0"\*