import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/components/ui/common/darkmode-toggle";
import { Input } from "@/components/ui/input";



export default function Home() {
  return (
    <div>
      <Input/>
      <Button className='bg-red-400 dark:bg-amber-600'>click me</Button>
      <DarkModeToggle/>
    </div>
  );
}