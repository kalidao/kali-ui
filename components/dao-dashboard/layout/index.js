import Layout from "../../layout";
import Sidebar from "./sidebar/";

export default function DaoLayout({ heading, children, props}) {
  return (
      <Layout heading={heading} {...props}>
          <Sidebar />
          {children}
      </Layout>
  )
}
