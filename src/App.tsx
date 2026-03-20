import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import { DataTable } from '@/components/data-table';

dayjs.locale('ru');

function App() {
  return (
    <ConfigProvider locale={ruRU}>
      <div className="app-layout">
        <DataTable />
      </div>
    </ConfigProvider>
  );
}

export default App;
