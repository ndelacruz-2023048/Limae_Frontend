import { NoticeList } from '../components/organismos/NoticeList/NoticeList';

const NoticeListpage = () => {
  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Lista de Noticias</h1>
      <NoticeList />
    </section>
  );
};

export default NoticeListpage;