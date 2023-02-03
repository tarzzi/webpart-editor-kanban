import * as React from "react";
import { IEditorKanBanProps } from "../IEditorKanBanProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { GraphService } from "../../services/GraphService";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import styles from "./Board.module.scss";

interface IBoardProps {
  context: any;
  siteUrl: string;
}
interface IBoardState {
  currentUserEmail: string;
}

// initialize GraphService.ts

export default class Board extends React.Component<IBoardProps, IBoardState> {
  constructor(props: IBoardProps) {
    super(props);
    this.state = {
      currentUserEmail: "",
    };
  }

  public async componentDidMount(): Promise<void> {
    console.log("Board.tsx: componentDidMount() called");
    const graph = new GraphService(this.props.context, this.props.siteUrl);
    await graph.getCurrentUserEmail().then((email) => {
      const emailAddess = email;
      this.setState({ currentUserEmail: emailAddess });
    });
  }

  public render(): React.ReactElement<IBoardProps> {
    const {} = this.props;
    const horizontalStackTokens = {
      childrenGap: 5,
      padding: 10,
    };


    return (
      <section>
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
