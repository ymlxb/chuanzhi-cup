<template>
  <div class="enhanced-calculator">
    <h2>碳足迹计算器</h2>
    
    <!-- 分类计算 -->
    <div class="category" v-for="(category, index) in categories" :key="index">
      <div class="category-header" @click="toggleCategory(index)">
        <h3>{{ category.name }}</h3>
        <span class="toggle-icon">{{ category.open ? '▼' : '▶' }}</span>
      </div>
      
      <div v-show="category.open" class="category-content">
        <!-- 家庭能源 -->
        <div v-if="category.id === 'energy'" class="input-group">
          <div class="input-item">
            <label>电力 (kWh/月):</label>
            <input type="number" v-model.number="energy.electricity" min="0">
          </div>
          <div class="input-item">
            <label>天然气 (m³/月):</label>
            <input type="number" v-model.number="energy.gas" min="0">
          </div>
        </div>

        <!-- 交通出行 -->
        <div v-if="category.id === 'transport'" class="input-group">
          <div class="input-item">
            <label>里程 (km/月):</label>
            <input type="number" v-model.number="transport.mileage" min="0">
          </div>
          <div class="input-item">
            <label>交通工具:</label>
            <select v-model="transport.vehicleType">
              <option value="car">汽油车</option>
              <option value="ev">电动车</option>
              <option value="public">公共交通</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div ref="chart" class="chart-container"></div>

    <!-- 结果与历史 -->
    <div class="result-section">
      <div class="total">
        <h3>月度碳排放: {{ totalEmissions.toFixed(2) }} kgCO₂</h3>
        <button @click="saveRecord">保存记录</button>
      </div>
      
      <div class="history">
        <h4>历史记录 (最近5次)</h4>
        <div v-for="(record, index) in history" :key="index" class="history-item">
          <span>#{{ index + 1 }} {{ record.date }} → {{ record.value }} kg</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import * as echarts from 'echarts'


  
    // 基础数据
    const energy = ref({ electricity: 0, gas: 0 })
    const transport = ref({ mileage: 0, vehicleType: 'car' })
    const chart = ref(null)
    let chartInstance = null

    // 分类管理
    const categories = ref([
      { id: 'energy', name: '🏠 家庭能源', open: true },
      { id: 'transport', name: '🚗 交通出行', open: true }
    ])

    // 排放系数
    const emissionFactors = {
      energy: {
        electricity: 0.5,
        gas: 1.9
      },
      transport: {
        car: 0.12,
        ev: 0.05,
        public: 0.08
      }
    }

    // 历史记录
    const history = ref(JSON.parse(localStorage.getItem('carbonHistory')) || [])

    // 计算总排放
    const totalEmissions = computed(() => {
      return (
        energy.value.electricity * emissionFactors.energy.electricity +
        energy.value.gas * emissionFactors.energy.gas +
        transport.value.mileage * emissionFactors.transport[transport.value.vehicleType]
      )
    })

    // 图表配置
    const initChart = () => {
      chartInstance = echarts.init(chart.value)
      updateChart()
    }

    const updateChart = () => {
      const option = {
        tooltip: { trigger: 'item' },
        legend: { top: 'bottom' },
        series: [{
          name: '碳排放组成',
          type: 'pie',
          radius: ['40%', '70%'],
          data: [
            { 
              value: energy.value.electricity * emissionFactors.energy.electricity,
              name: '电力排放',
              itemStyle: { color: '#5470C6' }
            },
            { 
              value: energy.value.gas * emissionFactors.energy.gas,
              name: '燃气排放',
              itemStyle: { color: '#91CC75' }
            },
            { 
              value: transport.value.mileage * emissionFactors.transport[transport.value.vehicleType],
              name: '交通排放',
              itemStyle: { color: '#FAC858' }
            }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
      chartInstance.setOption(option)
    }

    // 历史记录操作
    const saveRecord = () => {
      history.value.unshift({
        date: new Date().toLocaleDateString(),
        value: totalEmissions.value.toFixed(2)
      })
      history.value = history.value.slice(0, 5)
      localStorage.setItem('carbonHistory', JSON.stringify(history.value))
    }

    // 分类切换
    const toggleCategory = (index) => {
      categories.value[index].open = !categories.value[index].open
    }

    const recommendationConfig = [
      {
        condition: () => energy.value.electricity > 300,
        category: 'energy',
        title: '高电力消耗',
        description: '您每月用电量较高，建议：1.更换LED节能灯 2.使用一级能效电器',
        reduction: 45,
        impact: 3, 
        difficulty: 2,
        tags: ['节能', '电器']
      },
      {
        condition: () => transport.value.vehicleType === 'car' && transport.value.mileage > 500,
        category: 'transport',
        title: '燃油车高频使用',
        description: '考虑每周2天使用公共交通或拼车出行，可有效降低排放',
        reduction: 28,
        impact: 2,
        difficulty: 3,
        tags: ['交通', '共享出行']
      },

    ]

    const recommendationIcons = {
      energy: '⚡',
      transport: '🚗',
      diet: '🍴',
      default: '💡'
    }

    const activeRecommendations = computed(() => {
      return recommendationConfig
        .filter(r => r.condition())
        .map(r => ({
          ...r,
          impactLabel: ['低', '中', '高'][r.impact - 1],
          categoryIcon: recommendationIcons[r.category] || recommendationIcons.default
        }))
        .sort((a, b) => b.impact - a.impact) 
    })

    const betterThanPercent = computed(() => {
      const total = 100
      const reduction = activeRecommendations.value.reduce((sum, r) => sum + r.reduction, 0)
      return Math.min(100, Math.floor((reduction / 150) * 100))
    })

    onMounted(() => {
      initChart()
    })

    watch([energy, transport], () => {
      updateChart()
    }, { deep: true })

</script>

<style scoped>
.enhanced-calculator {
  max-width: 80rem;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.category {
  margin: 15px 0;
  border: 1px solid #eee;
  border-radius: 8px;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f8f9fa;
  cursor: pointer;
}

.input-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 15px;
  padding: 15px;
}

.input-item {
  display: flex;
  flex-direction: column;
}

input, select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 5px;
}

.chart-container {
  width: 100%;
  height: 40rem;
  margin: 2rem 0;
}

.result-section {
  margin-top: 2rem;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

button {
  padding: 8px 15px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.history-item {
  padding: 8px;
  margin: 5px 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
</style>