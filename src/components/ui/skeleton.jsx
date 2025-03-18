import {cn} from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (<div                style={{background: 'var(--bg-color)'}}
                              className={cn("animate-pulse rounded-md ", className)} {...props} />);
}

export { Skeleton }
