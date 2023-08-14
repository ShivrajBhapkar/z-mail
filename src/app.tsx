import MailBox from "./components/home/mailbox";
import Panel from "./components/home/panel";
import Toolbar from "./components/home/toolbar";

function App() {
  return (
    <main className="grid grid-cols-[4rem_1fr_24rem] grid-rows-[4rem_1fr] w-screen h-screen">
      <header className="border-b col-span-3 flex items-center justify-between px-4">
        <h1 className="font-semibold">Z-Mail</h1>
      </header>

      <Toolbar />
      <MailBox />
      <Panel />
    </main>
  );
}

export default App;
