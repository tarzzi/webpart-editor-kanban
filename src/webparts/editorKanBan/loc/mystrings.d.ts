declare interface IEditorKanBanWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  SiteUrlFieldLabel: string;
}

declare module 'EditorKanBanWebPartStrings' {
  const strings: IEditorKanBanWebPartStrings;
  export = strings;
}
