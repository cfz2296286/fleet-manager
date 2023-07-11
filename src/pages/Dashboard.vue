<template>
  <div class="page-wrap">
    <div class="page-head">
      <PageHeader title="Dashboard"></PageHeader>
    </div>
    <div class="page-body">
       
        <Row>
            <Col :span="11">
                <Card title="Charging Overview">
                    <div class="list">
                        <div class="item">
                            <PayCircleOutlined :style="{fontSize: '110px'}" />
                            <p class="number">{{ infos.data_order_fee?.data_order_fee_year || 0 }}</p>
                            <p>Annual Charging Revenue(million dollar)</p>
                        </div>
                        <div class="item">
							<PayCircleOutlined :style="{fontSize: '110px'}" />
                            <p class="number">{{ infos.data_order_fee?.data_order_fee_month || 0 }}</p>
                            <p>Charging Revenue for the Month(million dollar)</p>
                        </div>
                        <div class="item">
							<PayCircleOutlined :style="{fontSize: '110px'}" />
                            <p class="number">{{ infos.data_order_fee?.data_order_fee_yesterday || 0 }}</p>
                            <p>Yesterday’s Charging Revenue (dollar)</p>
                        </div>   
                        <div class="item">
                            <NodeIndexOutlined :style="{fontSize: '110px'}" />
                            <p class="number">{{ infos.data_order_capacity?.data_order_capacity_year || 0 }}</p>
                            <p>Annual Charging Capacity (MWh)</p>
                        </div>
                        <div class="item">
							<NodeIndexOutlined :style="{fontSize: '110px'}" />
                            <p class="number">{{ infos.data_order_capacity?.data_order_capacity_month || 0 }}</p>
                            <p>Charging Capacity for the Month(MWh)</p>
                        </div>
                        <div class="item">
							<NodeIndexOutlined :style="{fontSize: '110px'}" />
                            <p class="number">{{ infos.data_order_capacity?.data_order_capacity_yesterday || 0 }}</p>
                            <p>Yesterday’s Charging Capacity (kWh)</p>
                        </div>
                    </div>
                </Card>
            </Col>
           <Col :span="11" :offset="1">
            <Card title="Device Real-time Status">
                    <CardGrid style="text-align: center">
                        <span class="flex flex-col items-center">
                            <span class="text-md mt-2"><span class="dian total"></span> In-use Socket</span>
                            <span class="text-md mt-2">{{ infos.charge_pile_status?.total_charging_pile || 0 }}</span>
                        </span>
                    </CardGrid>
                    <CardGrid style="text-align: center">
                        <span class="flex flex-col items-center">
                            <span class="text-md mt-2 truncate"><span class="dian idle"></span> &nbsp; Free&nbsp;  Socket</span>
                            <span class="text-md mt-2 truncate">{{ infos.charge_pile_status?.total_avaliable_pile || 0 }}</span>
                        </span>
                    </CardGrid>
                    <CardGrid style="text-align: center">
                        <span class="flex flex-col items-center">
                            <span class="text-md mt-2 truncate"><span class="dian off-line"></span> Offline Socket</span>
                            <span class="text-md mt-2 truncate">{{ infos.charge_pile_status?.total_unavaliable_pile || 0 }}</span>
                        </span>
                    </CardGrid>
                    <!-- <CardGrid style="width: 25%; text-align: center">
                        <span class="flex flex-col items-center">
                            <span class="text-md mt-2 truncate"><span class="dian hitch"></span> Faulty Socket</span>
                            <span class="text-md mt-2 truncate">{{ infos.charge_pile_status?.total_unavaliable_pile || 0 }}</span>
                        </span>
                    </CardGrid> -->
                </Card>
                <Card title="Self-operated Sites Overview" style="margin-top: 40px;">
                    <CardGrid style="text-align: center">
                        <span class="flex flex-col items-center">
                            <span class="text-md mt-2">Total Station</span>
                            <span class="text-md mt-2">{{ infos.total_data?.total_charge_station || 0 }}</span>
                        </span>
                    </CardGrid>
                    <CardGrid style="text-align: center">
                        <span class="flex flex-col items-center">
                            <span class="text-md mt-2 truncate">Total Charging Points</span>
                            <span class="text-md mt-2 truncate">{{ infos.total_data?.total_charge_pile || 0 }}</span>
                        </span>
                    </CardGrid>
                    <CardGrid style="text-align: center">
                        <span class="flex flex-col items-center">
                            <span class="text-md mt-2 truncate">Total Sockets</span>
                            <span class="text-md mt-2 truncate">{{ infos.total_data?.total_charge_pile_connect_no || 0 }}</span>
                        </span>
                    </CardGrid>
                </Card>
            </Col>
        </Row>
        <Card title="Charging Curve" style="margin-top: 40px;">
            <template #extra> 
                <div class="you">
                    <span class="choice" @click="handleChangechoice('hour')"><a href="javascript:;">hour</a></span><span class="line"></span><span class="choice" @click="handleChangechoice('day')"><a href="javascript:;">day</a></span><span class="line"></span><span class="choice" @click="handleChangechoice('month')"><a href="javascript:;">month</a></span>
                </div>
            </template>
            <div ref="main" style=" height: 400px"></div>
        </Card>
        <!-- <div class="tabs">
            <Tabs v-model:activeKey="activeKey">
                <TabPane key="1" tab="充电收入">
                    <div ref="main" style="width: 80vw; height: 400px"></div>
                </TabPane>
                <TabPane key="2" tab="充电容量" force-render>
                    <div ref="main2" style="width: 80vw; height: 400px"></div>
                </TabPane>
            </Tabs>
        </div> -->
        
    </div>
    <div class="page-foot">
      <div class="fl"></div>
      <div class="fr">
       
      </div>
    </div>
  </div>
</template>


<script setup>
import { PayCircleOutlined, NodeIndexOutlined, SlidersOutlined, ApiOutlined, AlertOutlined } from '@ant-design/icons-vue';
import { Card, CardGrid, Row, Col, Tabs, TabPane, PageHeader} from 'ant-design-vue';
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts'
import { info,cartInfo } from '@/apis/dashboard'
import moment from 'moment';

const vShow = ref(false)
const vUser = ref({})
const choice = ref('month')


const handleShowVehicles = (record)=>{
  vShow.value = true
  vUser.value = record
}

const handleHideVehicles = (record)=>{
  vShow.value = false
  vUser.value = {}
}


const infos = ref([]);

const main = ref() // 使用ref创建虚拟DOM引用，使用时用main.value

onMounted(
  () => {
    // init()

    getData()
    getChart()
    return;
    
  }
)

const getData = async () => {
    const resp = await info()
    infos.value = resp.data
    return {infos}
}


// function init(choice='month' ) {
//   // 基于准备好的dom，初始化echarts实例
//   var myChart = echarts.init(main.value);
  // 指定图表的配置项和数据
  var option = {
    grid: {
        left: '3%',
        right: '2%',
        bottom: '3%',
        containLabel: true
    },
    legend: {
        data: ['Capacity', 'Revenue','Carbon']
    },
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: 'Capacity',
            type: 'line',
            smooth: true,
            data: []
        },
        {
            name: 'Revenue',
            type: 'line',
            smooth: true,
            data: [],
        },
        {
            name: 'Carbon',
            type: 'line',
            smooth: true,
            data: [],
        }
    ]
    };
    // const params = {
    //     'datetime_choice':choice
    //   }
    // setTimeout(() => {
    //     cartInfo(params).then((data)=>{
    //     // console.log(data);
    //     option.xAxis.data = [];
    //     option.series[0].data = [];
    //     option.series[1].data = [];
    //     option.series[2].data = [];
    //     if(choice == 'month'){
    //         data.data.carbdatacapcitymonth.map(item => {
    //             option.xAxis.data.push(item.order_end_datetime)
    //             option.series[2].data.push(item.charge_capacity)
    //         })
    //         data.data.datacapcitymonth.map(item=>{
    //             option.series[1].data.push(item.charge_capacity)
    //         })
    //         data.data.datafeemonth.map(item=>{
    //             option.series[0].data.push(item.order_fee)
    //         })
    //     }
        
    // console.log(option)
    //     return option;
    // })},300);
    // console.log(option)
  // 使用刚指定的配置项和数据显示图表。
//   myChart.setOption(option);
// }


const getChart = async ()=>{
    const params = {
        'datetime_choice':choice.value
      }
    await cartInfo(params).then((data)=>{
        
        option.xAxis.data = [];
        option.series[0].data = [];
        option.series[1].data = [];
        option.series[2].data = [];
        if(choice.value == 'month'){
            data.data.carbdatacapcitymonth.map(item => {
                option.xAxis.data.push(moment(item.order_end_datetime).format('YYYY-MM-DD HH:mm:ss'))
                option.series[2].data.push(item.charge_capacity)
            })
            data.data.datacapcitymonth.map(item=>{
                option.series[1].data.push(item.charge_capacity)
            })
            data.data.datafeemonth.map(item=>{
                option.series[0].data.push(item.order_fee)
            })
        }
        if(choice.value == 'day'){
            data.data.carbdatacapacitytoday.map(item => {
                option.xAxis.data.push(moment(item.order_end_datetime).format('YYYY-MM-DD HH:mm:ss'))
                option.series[2].data.push(item.charge_capacity)
            })
            data.data.datacapacitytoday.map(item=>{
                option.series[1].data.push(item.charge_capacity)
            })
            data.data.datafeetoday.map(item=>{
                option.series[0].data.push(item.order_fee)
            })
        }
        if(choice.value == 'hour'){
            data.data.carbdatacapacityhour.map(item => {
                option.xAxis.data.push(moment(item.order_end_datetime).format('YYYY-MM-DD HH:mm:ss'))
                option.series[2].data.push(item.charge_capacity)
            })
            data.data.datacapacityhour.map(item=>{
                option.series[1].data.push(item.charge_capacity)
            })
            data.data.datafeehour.map(item=>{
                option.series[0].data.push(item.order_fee)
            })
        }

    })
    var myChart = echarts.init(main.value);
    myChart.clear();
    return myChart.setOption(option);
}

const handleChangechoice = (p) => {
    choice.value = p
    console.log(choice);
    getChart()
  }

</script>

<style scoped>
.list {
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
}
.list .item {
    width: 32%;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    color: #fff;
    position: relative;
	overflow: hidden;
}
.list .item p{
	position: relative;
}
.list .item:nth-child(1){
    background-color:#56a2fd
}
.list .item:nth-child(2){
    background-color:#3fd883;
}
.list .item:nth-child(3) {
    background-color: #2de5dc;
    /* margin-bottom: 0; */
}
.list .item:nth-child(4) {
    background-color:#ffc000;
    margin-bottom: 0;
}
.list .item:nth-child(5){
    background-color:#fe6f4c;
    margin-bottom: 0;
}
.list .item:nth-child(6) {
    background-color: #7f54c4;
    margin-bottom: 0;
}
.list .item:nth-child(1) .anticon{
    color:#3e96ff;
}
.list .item:nth-child(2) .anticon{
    color:#24c66c;
}
.list .item:nth-child(3) .anticon {
    color: #09d8ce;
}
.list .item:nth-child(4) .anticon {
    color:#eab000;
}
.list .item:nth-child(5) .anticon {
    color:#fe5830;
}
.list .item:nth-child(6) .anticon{
    color: #7341c4;
}
.list .item .number {
    font-weight: bold;
    font-size: 20px;
}
.tabs {
    margin-top: 30px;
}
.anticon {
    position: absolute;
    right: -20px;
    bottom: -20px;
}
.flex {
    display: flex;
}

items-center {
    align-items: center;
}
.flex-col {
    flex-direction: column;
}
.mt-2 {
    margin-top: 0.5rem;
}
.dian{
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
}
.total{
    background: #2CE6D9;
}
.charge{
    background: #56A3FE;
}
.idle{
    background: #3ED881;
}
.off-line{
    background: #9A9A9A;
}

.hitch{
    background: #FFC105;
}
.choice{
    padding: 0 5px;
}
.line{
    display: inline-block;
    width: 2px;
    height: 10px;
    background-color: #1a1a1a;
}
.you{
    display: table-cell;
    vertical-align: middle;
}
</style>