%define only_path /var/www/onlyoffice/documentserver/sdkjs-plugins/chess

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
%{only_path}/config.json
%{only_path}/index.html
%{only_path}/index_about.html
%{only_path}/README.md
%{only_path}/resources/*
%{only_path}/scripts/chess.js
%{only_path}/translations/langs.json

#%{only_path}/resources/light/*
#%{only_path}/resources/store/*

# /var/www/dir1/fileB2.txt

%prep
# nothing to do here - no source

%build
# noting to do

%install
mkdir -p %{buildroot}/var/www/onlyoffice/documentserver/sdkjs-plugins/chess/
mkdir -p %{buildroot}/var/www/onlyoffice/documentserver/sdkjs-plugins/chess/resources/{dark,light,store}
mkdir -p %{buildroot}/var/www/onlyoffice/documentserver/sdkjs-plugins/chess/scripts/
mkdir -p %{buildroot}/var/www/onlyoffice/documentserver/sdkjs-plugins/chess/translations/

cp /onlyoffice.github.io/sdkjs-plugins/content/chess/config.json %{buildroot}/var/www/onlyoffice/documentserver/sdkjs-plugins/chess
cp /onlyoffice.github.io/sdkjs-plugins/content/chess/index_about.html %{buildroot}/var/www/onlyoffice/documentserver/sdkjs-plugins/chess
cp /onlyoffice.github.io/sdkjs-plugins/content/chess/index.html %{buildroot}/var/www/onlyoffice/documentserver/sdkjs-plugins/chess
cp /onlyoffice.github.io/sdkjs-plugins/content/chess/README.md %{buildroot}/var/www/onlyoffice/documentserver/sdkjs-plugins/chess
cp -r /onlyoffice.github.io/sdkjs-plugins/content/chess/resources/* %{buildroot}/var/www/onlyoffice/documentserver/sdkjs-plugins/chess/resources/
cp /onlyoffice.github.io/sdkjs-plugins/content/chess/scripts/chess.js %{buildroot}/var/www/onlyoffice/documentserver/sdkjs-plugins/chess/scripts/
cp /onlyoffice.github.io/sdkjs-plugins/content/chess/translations/langs.json %{buildroot}/var/www/onlyoffice/documentserver/sdkjs-plugins/chess/translations/

#mkdir -p %{buildroot}/var/www/onlyoffice/documentserver/sdkjs-plugins/chess/scripts
#mkdir -p %{buildroot}/var/www/onlyoffice/documentserver/sdkjs-plugins/chess/translations


%changelog
# * Mon Mar 06 2023 root
 
