import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Logo from '@/assets/logo.svg'

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-0  group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:text-center   data-[state=open]:w-full ">
              {/*<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square  items-center justify-center rounded-lg">*/}
              {/*<Avatar className="w-14">*/}
              {/*<div>*/}
              <img
                src={Logo}
                alt="@shadcn"
                className="bg-[var(--background)] rounded-full px-1.5 py-1 size-10"
              />
              {/*</div>*/}
              {/*<AvatarFallback>CN</AvatarFallback>*/}
              {/*</Avatar>*/}
              {/*</div>*/}
              <div className="grid flex-1 text-left text-sm leading-tight ">
                <span className="truncate text-[18px] font-medium">
                  Brandformance
                </span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
