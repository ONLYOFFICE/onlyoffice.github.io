%define source_dir /home/runner/work/onlyoffice.github.io/onlyoffice.github.io/sdkjs-plugins/content/chess
%define dest_dir /var/www/onlyoffice/documentserver/sdkjs-plugins/chess

Name:           onlyoffice-documentserver-plugin-chess
Summary:        Business productivity tools
Group:          Applications/Internet
Version:        1
Release:        2
Requires:       onlyoffice-documentserver
URL:            http://onlyoffice.com
Vendor:         Ascensio System SIA
License:        AGPLv3
BuildArch:      noarch

%description
ONLYOFFICE Documentserver Chess plugin allows you to easily add
a chess arrangement to your text file if needed.

%files
%defattr(-, onlyoffice, onlyoffice, -)
%{dest_dir}/*

%prep
# nothing to do here

%build
# noting to do

%install
mkdir -p %{buildroot}%{dest_dir}/
cp -r %{source_dir}/* %{buildroot}%{dest_dir}/

%changelog
# * Mon Mar 06 2023 root