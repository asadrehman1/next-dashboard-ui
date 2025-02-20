import { prisma } from '@/lib/prisma';
import CountChart from './CountChart';

const CountChartServer = async () => {
    const chartData = await prisma.student.groupBy({
        by: ["sex"],
        _count: true
    });

    const boys = chartData.find(d => d.sex === "MALE")?._count || 0;
    const girls = chartData.find(d => d.sex === "FEMALE")?._count || 0;

    return <CountChart boys={boys} girls={girls} />;
};

export default CountChartServer;
