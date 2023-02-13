import * as React from "react";
import { IEditorKanBanProps } from "../IEditorKanBanProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { GraphService } from "../../services/GraphService";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import styles from "./Board.module.scss";
import { SPHttpClient } from "@microsoft/sp-http";

interface IBoardProps {
  context: any;
  siteUrl: string;
}
interface IBoardState {
  currentUserEmail: string;
}
interface IPage {
  id: string;
  title: string;
  webUrl: string;
  author: {
    displayName: string;
  };
  createdDateTime: string;
  lastModifiedDateTime: string;
  lastModifiedBy: {
    displayName: string;
  };
}

interface IPages {
  value: IPage[];
}
// initialize GraphService.ts

export default class Board extends React.Component<IBoardProps, IBoardState> {


  constructor(props: IBoardProps) {
    super(props);
    this.state = {
      currentUserEmail: "",
    };
    this.getSiteCollectionPages = this.getSiteCollectionPages.bind(this);
  }

  public async componentDidMount(): Promise<void> {
    console.log("Board.tsx: componentDidMount() called");
    const graph = new GraphService(this.props.context, this.props.siteUrl);
    await graph.getCurrentUserEmail().then((email) => {
      const emailAddess = email;
      this.setState({ currentUserEmail: emailAddess });
    });

    await graph.getSiteCollectionPages().then((pages) => {
      console.log("Board.tsx: componentDidMount() pages", pages);
    });
  }

  public async getSiteCollectionPages(): Promise<IPages | any> {

    console.log(this.context)
    const body ={
      "request": {
        "RowLimit": 500,
        "Querytext": "*",
        "SelectProperties": {
          "results": [
            "Title",
            "Path",
            "AuthorOWSUSER",
            "Created",
          ],
        },
        "TrimDuplicates": false
      }
    }
    
    //const sites = await this.context.spHttpClient.post(`/sites/${this.SPSiteCollectionUrl}/_api/search/postquery`, SPHttpClient.configurations.v1, {
      const sites = await this.props.context.spHttpClient.post(`/sites/webpart/_api/search/postquery`, SPHttpClient.configurations.v1, {
      headers: {
        "Accept": "application/json;odata=nometadata",
        "Content-type": "application/json;odata=verbose",
        "odata-version": ""
      },
      body: JSON.stringify({
        "request": {
          "RowLimit": 10,
          "Querytext": "AuthorOWSUSER:'tarmodeviadmin@tarmodev001.onsharepoint.com'",
          "SelectProperties": {
            "results": [
              "Title",
              "Path",
              "AuthorOWSUSER",
              "Created",
            ],
          },
          "TrimDuplicates": false
        }
      })
    }).then((response: any) => {
      console.log(response);
      return response.json();
    }).catch((error : any) => {
      console.log(error);
    });

    return new Promise((resolve, reject) => {
      resolve("");

    });

  }

  public render(): React.ReactElement<IBoardProps> {
    const horizontalStackTokens = {
      childrenGap: 5,
      padding: 10,
    };


    return (
      <section>
        <button onClick={this.getSiteCollectionPages}>Pres me</button>
        <h1>Board.tsx current user {this.state.currentUserEmail}</h1>
        <Stack horizontal tokens={horizontalStackTokens}>
          <Stack className={styles.column} grow={1}><h1>Not started</h1>
          
          </Stack>
          <Stack className={styles.column} grow={1}><h1>Doing</h1>
          
          </Stack>
          <Stack className={styles.column} grow={1}><h1>Published</h1>
          
          </Stack>
          <Stack className={styles.column} grow={1}><h1>Closed</h1>
          
          </Stack>
        </Stack>
      </section>
    );
  }
}
