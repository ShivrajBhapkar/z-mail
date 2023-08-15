import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Layout from "./layout";
import Properties from "./properties";

export default function Panel() {
  return (
    <Tabs defaultValue="layout" className="p-3 border-l">
      <TabsList>
        <TabsTrigger value="layout">Layout</TabsTrigger>
        <TabsTrigger value="properties">Properties</TabsTrigger>
      </TabsList>

      <TabsContent value="layout">
        <Layout />
      </TabsContent>

      <TabsContent value="properties">
        <Properties />
      </TabsContent>
    </Tabs>
  );
}
