<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 300px;" class="filter-item"
                placeholder="中文/英文商品名" v-model="listQuery.productName">
      </el-input>
      <!--<el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.importance" :placeholder="$t('table.importance')">-->
      <!--<el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--<el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" :placeholder="$t('table.type')">-->
      <!--<el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--<el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">-->
      <!--<el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">添加商品
      </el-button>
      <!--<el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>-->
      <!--<el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showReviewer">{{$t('table.reviewer')}}</el-checkbox>-->
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
              highlight-current-row
              style="width: 100%">
      <el-table-column align="center" label="商品序列号" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="130" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!--<el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>-->
          <!--<el-button v-if="scope.row.status!='published'" size="mini" type="success"-->
          <!--@click="handleModifyStatus(scope.row,'published')">{{$t('table.publish')}}-->
          <!--</el-button>-->
          <!--<el-button v-if="scope.row.status!='draft'" size="mini" @click="handleModifyStatus(scope.row,'draft')">-->
          <!--{{$t('table.draft')}}-->
          <!--</el-button>-->
          <el-button size="mini" type="danger"
                     @click="handleModifyStatus(scope.row,'deleted')">删除
          </el-button>
        </template>
      </el-table-column>
      <!--<el-table-column width="150px" align="center" :label="$t('table.date')">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column min-width="150px" label="商品中文名">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.productNameCN}}</span>
          <!--<el-tag>{{scope.row.type | typeFilter}}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="商品英文名">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.productNameEN}}</span>
          <!--<el-tag>{{scope.row.type | typeFilter}}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column width="210px" align="center" label="商品链接">
        <template slot-scope="scope">
          <!--<span>{{scope.row.author}}</span>-->
          <a target=_blank                   :href="scope.row.productLink">{{scope.row.productLink}}</a>
        </template>
      </el-table-column>
      <!--<el-table-column width="110px" v-if='showReviewer' align="center" :label="$t('table.reviewer')">-->
      <!--<template slot-scope="scope">-->
      <!--<span style='color:red;'>{{scope.row.reviewer}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column width="80px" label="商品重量">
        <template slot-scope="scope">
          {{scope.row.productWeight}}
          <!--<svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>-->
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品单价" width="95">
        <template slot-scope="scope">
          {{scope.row.productPrice}}
        </template>
      </el-table-column>
      <el-table-column width="80px" label="运费">
        <template slot-scope="scope">
          {{scope.row.productFreight}}

          <!--<svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>-->
        </template>
      </el-table-column>
      <el-table-column width="80px" label="商品售价英镑">
        <template slot-scope="scope">
          {{scope.row.productPriceGBP}}

          <!--<svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>-->
        </template>
      </el-table-column>
      <el-table-column width="80px" label="商品售价英镑2">
        <template slot-scope="scope">
          {{scope.row.productPriceGBP2}}

          <!--<svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>-->
        </template>
      </el-table-column>
      <el-table-column width="80px" label="商品售价英镑3">
        <template slot-scope="scope">
          {{scope.row.productPriceGBP3}}

          <!--<svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>-->
        </template>
      </el-table-column>
      <el-table-column width="80px" label="澳元1">
        <template slot-scope="scope">
          {{scope.row.productPriceAUD}}

          <!--<svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>-->
        </template>
      </el-table-column>
      <el-table-column width="80px" label="澳元2">
        <template slot-scope="scope">
          {{scope.row.productPriceAUD2}}

          <!--<svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>-->
        </template>
      </el-table-column>
      <el-table-column width="80px" label="澳元3">
        <template slot-scope="scope">
          {{scope.row.productPriceAUD3}}

          <!--<svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>-->
        </template>
      </el-table-column>
      <el-table-column width="180px" label="备注">
        <template slot-scope="scope">
          {{scope.row.remark || '暂无备注'}}

          <!--<svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>-->
        </template>
      </el-table-column>

      <!--<el-table-column class-name="status-col" :label="$t('table.status')" width="100">-->
      <!--<template slot-scope="scope">-->
      <!--<el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>-->
      <!--</template>-->
      <!--</el-table-column>-->

    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.rows"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="80%">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="140px"
               style='margin-left:50px;'>
        <!--<el-form-item prop="pic" label="图片">-->
        <!--<el-upload-->
        <!--action="#"-->
        <!--v-model=temp.pic-->
        <!--list-type="picture-card">-->
        <!--<i class="el-icon-plus"></i>-->
        <!--</el-upload>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="商品序列号" prop="num">-->
        <!--<el-input v-model="temp.num"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="商品中文名" prop="productNameCN">
          <el-input v-model="temp.productNameCN"></el-input>
        </el-form-item>
        <el-form-item label="商品英文名" prop="productNameEN">
          <el-input v-model="temp.productNameEN"></el-input>
        </el-form-item>
        <el-form-item label="商品链接" prop="productLink">
          <el-input v-model="temp.productLink"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="productWeight">
          <el-input type=number v-model.number="temp.productWeight"></el-input>
        </el-form-item>
        <el-form-item label="商品单价" prop="productPrice">
          <el-input type=number v-model.number="temp.productPrice"></el-input>
        </el-form-item>
        <el-form-item label="运费" prop="productFreight">
          <el-input :disabled='true' v-model="temp.productFreight"></el-input>
        </el-form-item>
        <el-form-item label="英镑售价1" prop="productPriceGBP">
          <el-input :disabled='true' v-model="temp.productPriceGBP"></el-input>
        </el-form-item>
        <el-form-item label="英镑售价2" prop="productPriceGBP2">
          <el-input :disabled='true' v-model="temp.productPriceGBP2"></el-input>
        </el-form-item>
        <el-form-item label="英镑售价3" prop="productPriceGBP3">
          <el-input :disabled='true' v-model="temp.productPriceGBP3"></el-input>
        </el-form-item>
        <el-form-item label="澳元售价1" prop="productPriceAUD">
          <el-input :disabled='true' v-model="temp.productPriceAUD"></el-input>
        </el-form-item>
        <el-form-item label="澳元售价2" prop="productPriceAUD2">
          <el-input :disabled='true' v-model="temp.productPriceAUD2"></el-input>
        </el-form-item>
        <el-form-item label="澳元售价3" prop="productPriceAUD3">
          <el-input :disabled='true' v-model="temp.productPriceAUD3"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="temp.remark"></el-input>
        </el-form-item>


        <!--<el-form-item :label="$t('table.date')" prop="timestamp">-->
        <!--<el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date">-->
        <!--</el-date-picker>-->
        <!--</el-form-item>-->

        <!--<el-form-item :label="$t('table.title')" prop="title">-->
        <!--<el-input v-model="temp.title"></el-input>-->
        <!--</el-form-item>-->

        <!--<el-form-item :label="$t('table.status')">-->
        <!--<el-select class="filter-item" v-model="temp.status" placeholder="Please select">-->
        <!--<el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->

        <!--<el-form-item :label="$t('table.importance')">-->
        <!--<el-rate style="margin-top:8px;" v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"-->
        <!--:max='3'></el-rate>-->
        <!--</el-form-item>-->

        <!--<el-form-item :label="$t('table.remark')">-->
        <!--<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input"-->
        <!--v-model="temp.remark">-->
        <!--</el-input>-->
        <!--</el-form-item>-->
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

    <!--<el-dialog title="Reading statistics" :visible.sync="dialogPvVisible">-->
    <!--<el-table :data="pvData" border fit highlight-current-row style="width: 100%">-->
    <!--<el-table-column prop="key" label="Channel"> </el-table-column>-->
    <!--<el-table-column prop="pv" label="Pv"> </el-table-column>-->
    <!--</el-table>-->
    <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button type="primary" @click="dialogPvVisible = false">{{$t('table.confirm')}}</el-button>-->
    <!--</span>-->
    <!--</el-dialog>-->

  </div>
</template>

<script>
  import {fetchList, fetchPv, createArticle, updateArticle} from '@/api/article'
  import waves from '@/directive/waves' // 水波纹指令
  import {parseTime} from '@/utils'
  //  import Upload from '@/components/Upload/singleImage3' // 上传组件
  //
  //  const calendarTypeOptions = [
  //    {key: 'CN', display_name: 'China'},
  //    {key: 'US', display_name: 'USA'},
  //    {key: 'JP', display_name: 'Japan'},
  //    {key: 'EU', display_name: 'Eurozone'}
  //  ]
  //
  //  // arr to obj ,such as { CN : "China", US : "USA" }
  //  const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  //    acc[cur.key] = cur.display_name
  //    return acc
  //  }, {})

  export default {
    name: 'complexTable',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          rows: 20,
          productName: undefined,
        },
//        importanceOptions: [1, 2, 3],
//        sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
//        statusOptions: ['published', 'draft', 'deleted'],
//        showReviewer: false,num:"
        temp: {
          productId: "",
//          pic: ' ',
          productNameCN: ' ',
          productNameEN: ' ',
          productLink: ' ',
          productWeight: ' ',
          productPrice: ' ',
          productFreight: ' ',
          productPriceGBP: ' ',
          productPriceGBP2: ' ',
          productPriceGBP3: ' ',
          productPriceAUD1: ' ',
          productPriceAUD2: ' ',
          productPriceAUD3: ' ',
          remark: ' ',
        },
        GBPExchangeRate: 1,// 英镑汇率
        AUDExchangeRate: 1,// 澳元汇率
        weightPrice: 0.16,// 运费
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑商品',
          create: '新建商品'
        },
        dialogPvVisible: false,
        pvData: [],
        rules: {
//          num: [{required: true, message: '此项为必填项', trigger: 'change'}],
//          pic: [{required: true, message: '此项为必填项', trigger: 'change'}],
          productNameCN: [{required: true, message: '此项为必填项', trigger: 'change'}],
          productNameEN: [{required: true, message: '此项为必填项', trigger: 'change'}],
          productLink: [{required: true, message: '此项为必填项', trigger: 'change'}],
          productWeight: [{ required: true, message: '此项为数字必填项', trigger: 'change'}],
          productPrice: [{ required: true, message: '此项为数字必填项', trigger: 'change'}],
          productFreight: [{ required: true, message: '此项为数字必填项', trigger: 'change'}],
          productPriceGBP: [{ required: true, message: '此项为数字必填项', trigger: 'change'}],
          productPriceGBP2: [{ required: true, message: '此项为数字必填项', trigger: 'change'}],
          productPriceGBP3: [{ required: true, message: '此项为数字必填项', trigger: 'change'}],
          productPriceAUD1: [{ required: true, message: '此项为数字必填项', trigger: 'change'}],
          productPriceAUD2: [{ required: true, message: '此项为数字必填项', trigger: 'change'}],
          productPriceAUD3: [{ required: true, message: '此项为数字必填项', trigger: 'change'}],

        },
        downloadLoading: false
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      },
//      typeFilter(type) {
//        return calendarTypeKeyValue[type]
//      }
    },
    beforeMount() {
      this.getAxios(this.$store.state.app.http.initMethod, {}).then(data => {
        this.GBPExchangeRate = data.data.data.GBPExchangeRate;
        this.AUDExchangeRate = data.data.data.AUDExchangeRate;
        this.weightPrice = data.data.data.weightPrice;
        this.getList()
      })

    },
    watch: {
      temp: {
        handler(newValue, oldValue) {
          newValue.productFreight = (+newValue.productWeight * +this.weightPrice).toFixed(2)
          newValue.productPriceGBP = ((+newValue.productPrice + +newValue.productFreight) * 1.9 / +this.GBPExchangeRate).toFixed(2)
          newValue.productPriceGBP2 = ((+newValue.productPrice + +newValue.productFreight) * 2.1 / +this.GBPExchangeRate).toFixed(2)
          newValue.productPriceGBP3 = ((+newValue.productPrice + +newValue.productFreight) * 2.5 / +this.GBPExchangeRate).toFixed(2)
          newValue.productPriceAUD = ((+newValue.productPrice + +newValue.productFreight) * 1.7 / +this.AUDExchangeRate).toFixed(2)
          newValue.productPriceAUD2 = ((+newValue.productPrice + +newValue.productFreight) * 2 / +this.AUDExchangeRate).toFixed(2)
          newValue.productPriceAUD3 = ((+newValue.productPrice + +newValue.productFreight) * 2.3 / +this.AUDExchangeRate).toFixed(2)
        },
        deep: true
      }
    },
    methods: {
      getList() {
        this.listLoading = true
        this.getAxios(this.$store.state.app.http.getProductList, this.listQuery).then(response => {
          this.list = response.data.data.rows
          this.total = response.data.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.rows = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleModifyStatus(row, status) {
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getAxios(this.$store.state.app.http.delProduct, {productId: row.id})
            .then(data => {
              if (data.data.result == 0) {
                this.list.forEach((item, index) => {
                  if (item.id == row.id) {
                    this.list.splice(index, 1);
                  }
                })
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });

              } else {
                this.$message(data.data.message);
              }
            })

        })

//        row.status = status
      },
      // 数据重置
      resetTemp() {
        this.temp = {

          productNameCN: ' ',
          productId: ' ',
          productNameEN: ' ',
          productLink: ' ',
          productWeight: ' ',
          productPrice: ' ',
          productFreight: ' ',
          productPriceGBP: ' ',
          productPriceGBP2: ' ',
          productPriceGBP3: ' ',
          productPriceAUD1: ' ',
          productPriceAUD2: ' ',
          productPriceAUD3: ' ',
          remark: ' ',
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {

            this.getAxios(this.$store.state.app.http.updateOrAddProduct, this.temp).then((data) => {
              if (data.data.result == 0) {
                this.getList();
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
//        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
//            const tempData = Object.assign({}, this.temp)
//            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            this.temp.productId = this.temp.id;
            this.getAxios(this.$store.state.app.http.updateOrAddProduct, this.temp).then(() => {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleDelete(row) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      },
      handleFetchPv(pv) {
        fetchPv(pv).then(response => {
          this.pvData = response.data.pvData
          this.dialogPvVisible = true
        })
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel(tHeader, data, 'table-list')
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      }
    }
  }
</script>
