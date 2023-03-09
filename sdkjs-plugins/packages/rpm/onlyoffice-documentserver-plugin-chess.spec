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
%{only_path}/*


%prep
# nothing to do here - no source


%build
# noting to do


%install
mkdir -p %{buildroot}/%{only_path}/
mkdir -p %{buildroot}/%{only_path}/resources/{dark,light,store}
mkdir -p %{buildroot}/%{only_path}/scripts
mkdir -p %{buildroot}/%{only_path}/translations

cp -r /onlyoffice.github.io/sdkjs-plugins/content/chess/* %{buildroot}/%{only_path}/


%changelog
# * Mon Mar 06 2023 root
 

