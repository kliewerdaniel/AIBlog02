declare module './structure' {
  import { DefaultDocumentNodeResolver } from 'sanity/desk';
  export const defaultDocumentNode: DefaultDocumentNodeResolver;
}

declare module 'sanity-plugin-media' {
  export const media: any;
}

declare module 'sanity-plugin-iframe-pane' {
  const IframePane: any;
  export default IframePane;
}
