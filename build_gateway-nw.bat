del gateway-nw.nw
del gateway-nw-ia32.exe
del gateway-nw-win-ia32.zip

@rem 打包工程操作 使用call 确保环境
call ..\gateway-nw\package_gateway-nw.bat

@rem 生成exe
copy /b nw.exe+gateway-nw.nw gateway-nw-ia32.exe
del gateway-nw.nw

@rem 打包可用的zip
"D:\Program Files\7-Zip\7z.exe" a -tzip gateway-nw-win-ia32.zip -x!pdf.dll -x!nwsnapshot.exe -x!nw.exe -x!
build_gateway-nw.bat "%~dp0"\*