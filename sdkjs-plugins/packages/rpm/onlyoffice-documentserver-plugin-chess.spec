Name:           onlyoffice-documentserver-plugin-chess
Summary:        Business productivity tools
Group:          Applications/Internet
Version:        1
Release:        2
URL:            http://onlyoffice.com
Vendor:         Ascensio System SIA
License:        AGPLv3

%description
ONLYOFFICE Documentserver Chess plugin allows you to easily add
a chess arrangement to your text file if needed.

%files
var/www/onlyoffice/documentserver/sdkjs-plugins/chess/config.json
# /var/www/dir1/fileB2.txt

%prep
# nothing to do here - no source

%build
# noting to do

%install
mkdir -p %{buildroot}/var/www/onlyoffice/documentserver/sdkjs-plugins/chess/
cp ../../content/chess/config.json %{buildroot}/var/www/onlyoffice/documentserver/sdkjs-plugins/chess/
# cp /fileA1.txt %{buildroot}/var/www/dir1/mae
# cp /fileB2.txt %{buildroot}/var/www/dir1


%changelog
# * Mon Mar 06 2023 root
 
