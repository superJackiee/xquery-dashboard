import React from "react"
import ReactApexChart from 'react-apexcharts'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { light, dark } from '../../theme'

import styles from "./index.module.scss"

const ApexChart = () => {
  const dataSet = [
    [620, 630, 640, 660, 680, 690, 620, 680, 740, 710, 720, 800],
    [390, 395, 392, 405, 410, 420, 400, 430, 460, 440, 445, 450]
  ]

  const mode = useSelector((state) => state.toogle.darkMode)
  const theme = mode === 'true' ? dark : light

  const series = [
    { name: 'This period', data: dataSet[0] },
    { name: 'Previous period', data: dataSet[1] }]
  const options = {
    colors: [theme.palette.success.dark, theme.palette.success.light],
    chart: {
      type: 'area',
      stacked: false,
      width: '100%',
      height: 350,
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100]
      },
    },
    grid: {
      padding: {
        left: -5,
        right: 5
      }
    },
    yaxis: {
      title: {
        text: 'Number of calls',
        style: {
          color: theme.palette.text.primary,
          fontFamily: 'Inter',
          fontWeight: 500
        }
      },
      labels: {
        style: {
          colors: theme.palette.text.primary,
          fontFamily: 'Inter',
        },
        offsetX: 0,
        formatter: function (val) {
          return val;
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false
      }
    },
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Month',
        style: {
          color: theme.palette.text.primary,
          fontFamily: 'Inter',
          fontWeight: 500
        }
      },
      categories: [1643493740000, 1646085740000, 1648677740000, 1651269740000, 1653861740000, 1656453740000, 1659045740000, 1661637740000, 1664229740000, 1666821740000, 1669413740000, 1672005740000],
      labels: {
        style: {
          colors: theme.palette.text.primary,
          fontFamily: 'Inter'
        },
        offsetX: 5,
        formatter: function (val, timestamp) {
          return moment(new Date(timestamp)).format("MMM")
        }
      }
    },
    tooltip: {
      shared: true
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetX: -10,
      labels: {
        colors: theme.palette.text.primary,
        fontFamily: 'Inter'
      }
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          xaxis: {
            title: {
              text: undefined
            }
          },
          yaxis: {
            labels: {
              show: false
            }
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: -20
          }
        }
      },
    ]
  }

  return (
    <div id="chart" style={{ width: '100%' }}>
      {/* @ts-ignore */}
      <ReactApexChart className={styles.chartBody} options={options} series={series} type="area" />
    </div>
  )
}

export default ApexChart