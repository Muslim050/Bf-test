import { LogOut } from 'lucide-react'
import { TeamSwitcher } from './team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { NavMain } from '@/components/module/Sidebar/sidebar/nav-main.jsx'
import { menuItems } from '@/components/module/Sidebar/MenuItems.js'
import Cookies from 'js-cookie'
import {
  Collapsible,
  CollapsibleTrigger,
} from '@/components/ui/collapsible.jsx'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog.jsx'
import LogoutDialog from '@/components/module/Sidebar/LogoutDialog.jsx'

export function AppSidebar({ ...props }) {
  const role = Cookies.get('role')

  return (
    <Sidebar
      className="border_container glass-background ml-3 my-3 pb-4 pt-1 rounded-2xl"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuItems} userRole={role} />
      </SidebarContent>
      <SidebarFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Collapsible asChild className="group/collapsible">
              <SidebarMenuItem className="!list-none">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <div className="flex 	gap-2 items-center">
                      <LogOut className="size-7" />
                      <span>Выход</span>
                    </div>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
            </Collapsible>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <LogoutDialog />
          </AlertDialogContent>
        </AlertDialog>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
