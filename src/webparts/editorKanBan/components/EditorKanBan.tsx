import * as React from 'react';
import styles from './EditorKanBan.module.scss';
import { IEditorKanBanProps } from './IEditorKanBanProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Board from './Board/Board';

interface IEditorKanBanState {
  siteUrl: string;
}

export default class EditorKanBan extends React.Component<IEditorKanBanProps, IEditorKanBanState> {
  public render(): React.ReactElement<IEditorKanBanProps> {
    const {
      context,
      siteUrl
    } = this.props;

    return (
      <section className={`${styles.editorKanBan}`}>
        <h1>Some data her plz</h1>
        <Board context={context} siteUrl={siteUrl} />
      </section>
    );
  }
}
