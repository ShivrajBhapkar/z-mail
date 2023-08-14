import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Layout from "./layout";

export default function Panel() {
  return (
    <Tabs defaultValue="layout" className="p-3">
      <TabsList>
        <TabsTrigger value="layout">Layout</TabsTrigger>
        <TabsTrigger value="properties">Properties</TabsTrigger>
      </TabsList>

      <TabsContent value="layout">
        <Layout />
      </TabsContent>

      <TabsContent value="properties">
        <div>Properties</div>
      </TabsContent>
    </Tabs>
  );
}
