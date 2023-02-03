// Create a service to handle calls to SharePoint and Graph
import { WebPartContext } from "@microsoft/sp-webpart-base";

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

export class GraphService {
  private context: WebPartContext;
  private SPSiteCollectionUrl: string;

  constructor(context: WebPartContext, SPSiteCollectionUrl: string) {
    this.context = context;
    this.SPSiteCollectionUrl = SPSiteCollectionUrl;
  }

  public async getCurrentUserEmail(): Promise<string> {
    const graphClient = await this.context.msGraphClientFactory.getClient("3");
    return new Promise((resolve, reject) => {
        graphClient.api('/me').get((err: any, res: any, rawResponse?: any) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            if (!res || !res.userPrincipalName) {
                console.error("Response object or userPrincipalName property not found.");
                reject(new Error("Response object or userPrincipalName property not found."));
                return;
            }
            resolve(res.userPrincipalName);
        }).catch((error) => {
            console.error(error);
            reject(error);
    })}); 
  }

  public async getSiteCollectionPages(): Promise<IPages> {
    const graphClient = await this.context.msGraphClientFactory.getClient("3");
    const pages = await graphClient
      .api(`/sites/${this.SPSiteCollectionUrl}/pages`)
      .version("1.0")
      .get((err: any, res: any, rawResponse?: any) => {
        if (err) {
          console.log(err);
        }
      });
    console.log(pages);
    // get each page info and add to the pages object
    /*         for (let i = 0; i < pages.value.length; i++) {
            const page = await this.getPageInfo(pages.value[i].id);
            pages.value[i].author = page.author.displayName;
            pages.value[i].webUrl = page.webUrl;
            pages.value[i].createdDateTime = page.createdDateTime;
            pages.value[i].lastModifiedDateTime = page.lastModifiedDateTime;
            pages.value[i].lastModifiedBy = page.lastModifiedBy.displayName;
        } */

    return pages;
  }

  public async getPageInfo(pageId: string): Promise<IPage> {
    const graphClient = await this.context.msGraphClientFactory.getClient("3");
    const page = await graphClient
      .api(`/sites/${this.SPSiteCollectionUrl}/pages/${pageId}`)
      .version("1.0")
      .get((err: any, res: any, rawResponse?: any) => {
        if (err) {
          console.log(err);
        }
      });
    return page;
  }
}
