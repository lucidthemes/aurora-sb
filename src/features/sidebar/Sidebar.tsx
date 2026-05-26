import useSidebar from './useSidebar';
import SidebarLoading from './components/Loading';
import SidebarError from './components/Error';
import SidebarWidgets from './components/Widgets';

export default function Sidebar({ name, aside = true }: { name: string; aside?: boolean }) {
  const sidebarQuery = useSidebar(name);

  if (sidebarQuery.isPending) return <SidebarLoading />;

  if (sidebarQuery.isSuccess && !sidebarQuery.data) return <SidebarError />;

  if (sidebarQuery.isSuccess && sidebarQuery.data) {
    const sidebar = sidebarQuery.data;

    const SidebarElement = aside ? 'aside' : 'div';
    const sidebarClasses = aside ? 'rounded-md bg-white p-5' : '';

    return (
      <SidebarElement className={`flex flex-col gap-y-10 ${sidebarClasses}`} aria-label={sidebar?.title}>
        <SidebarWidgets widgets={sidebar.widgets} />
      </SidebarElement>
    );
  }
}
