<template>
  <Loading v-if="$fetchState.pending" />
  <el-container v-else direction="vertical" class="pt-6 px-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
      <el-page-header @back="$router.go(-1)" class="text-2xl font-semibold" title="Назад" content="Все товары" />
      <el-dropdown @command="handleCommand" split-button type="primary" @click="showDrawer" class="mt-2">
        Добавить товар
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="dialogBrandVisible">Добавить производителя</el-dropdown-item>
          <el-dropdown-item command="dialogMachineTypeVisible" divided>Создать тип техники</el-dropdown-item>
          <el-dropdown-item command="dialogMachineVisible">Создать технику</el-dropdown-item>
          <el-dropdown-item command="dialogCreatePropVisible">Создать свойство</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-table ref="multipleTable" :data="products" class="w-full" @selection-change="handleSelectionChange">
      <el-table-column type="selection" />
      <el-table-column property="name" label="Наименование" />
      <el-table-column property="article" label="Артикул" />
      <el-table-column property="actualPrice" label="Стоимость" />
      <el-table-column label="Действия" min-width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">Редактировать</el-button>
          <el-button type="text" @click="handleDelete(scope.$index, scope.row)">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-center pt-2 mb-2">
      <el-pagination v-if="pagination.lastPage > 1" :page-size.sync="pagination.perPage" background
        :pager-count="pagination.perPage" @current-change="paginationCurrentChange" layout="pager"
        :total="pagination.total">
      </el-pagination>
    </div>
    <el-drawer :title="drawer.title" :before-close="handleClose" :visible.sync="drawer.isShow" direction="rtl"
      custom-class="w-full lg:w-1/3" size="">
      <el-form ref="createForm" :model="form" :rules="rules" class="px-5" label-position="top">
        <el-form-item label="Наименование" prop="name">
          <el-input type="text" v-model="form.name" />
        </el-form-item>
        <el-form-item label="Артикул" prop="article">
          <el-input type="text" v-model="form.article" />
        </el-form-item>
        <el-form-item label="Производитель" prop="brand">
          <el-select v-model="form.brand" filterable class="w-full" @change="selectBrand(form.brand)"
            no-data-text="Нет данных" no-match-text="Производитель не найден" placeholder="Выберите производителя"
            value-key="id">
            <el-option v-for="item in brands" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Тип техники" prop="type">
          <el-select v-model="form.type" :disabled="!(form.brand != null)" filterable
            @change="selectMachineType(form.type)" class="w-full" no-data-text="Нет данных"
            no-match-text="Тип техники не найден" value-key="id" placeholder="Выберите тип техники">
            <el-option v-for="item in machineTypesForBrand" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Техника" prop="machines">
          <el-select v-model="form.machines" :disabled="!(form.type)" filterable class="w-full" multiple value-key="id"
            no-data-text="Нет данных" no-match-text="Техника не найдена" placeholder="Выберите технику">
            <el-option v-for="item in machines" :key="item.id" :label="item.name" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Категория" prop="category">
          <el-select v-model="form.category" filterable class="w-full" no-data-text="Нет данных"
            @change="changeCategory(form.category)" no-match-text="Категории не найдены"
            placeholder="Выберите категорию" value-key="id">
            <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Цена" prop="actualPrice">
          <el-input v-model="form.actualPrice" type="number" class="w-full" placeholder="Введите цену" />
        </el-form-item>
        <el-form-item v-if="form.category == 3" label="Цена распродажи" prop="discountPrice">
          <el-input v-model="form.discountPrice" type="number" class="w-full" placeholder="Введите цену распродажи" />
        </el-form-item>
        <el-form-item label="Описание" prop="description">
          <el-input type="textarea" :rows="3" placeholder="Данное поле не обязательное" v-model="form.description" />
        </el-form-item>
        <el-form-item label="Свойства">
          <ol v-if="form.properties">
            <li v-for="prop in form.properties" :key="prop.id">
              <el-input placeholder="Значение" v-model="prop.value">
                <el-select v-model="prop.property" slot="prepend" value-key="id" no-data-text="Нет данных"
                  no-match-text="Нет подходящих свойств" placeholder="Свойство" filterable class="lg:w-[140px]">
                  <el-option v-for="item in properties" :key="item.id" :label="item.name" :value="item" />
                </el-select>
              </el-input>
              <div class="flex justify-end py-1.5 gap-x-1.5 pb-2.5">
                <el-input :disabled="!prop.isDimension" v-model="prop.dimension" placeholder="Единица измерения">
                  <el-checkbox slot="prepend" v-model="prop.isDimension">
                    Единица измерения?
                  </el-checkbox>
                </el-input>
              </div>
            </li>
          </ol>

          <el-button type="primary" icon="el-icon-plus" class="w-1/2" @click="addProperty">
            Добавить свойство
          </el-button>
        </el-form-item>
        <el-form-item label="Изображения">
          <el-upload action=" " name="images" ref="uploaderProductImages" class="mb-3" list-type="picture-card"
            :on-change="onChangeUploaderProductImages" :multiple="true" :auto-upload="false" :file-list="form.images">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-delete" @click="handleRemoveProductImage(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item class="pt-3">
          <el-button v-if="drawer.isNew" type="primary" @click="submitForm">Добавить</el-button>
          <el-button v-else type="primary" @click="updateForm">Обновить</el-button>
          <el-button @click="resetForm">Сбросить</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <!-- Brand dialog -->
    <el-dialog title="Добавить производителя" :visible.sync="dialogBrandVisible" width="80%">
      <el-form :model="brand" ref="dialogCreateBrand" label-position="top">
        <el-form-item label="Наименование" prop="name">
          <el-input v-model="brand.name" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogBrandVisible = false">Отмена</el-button>
        <el-button type="primary" @click="createBrand"> Добавить </el-button>
      </span>
    </el-dialog>

    <!-- Create prop dialog -->
    <el-dialog title="Создать свойство" :visible.sync="dialogCreatePropVisible" width="80%">
      <el-form :model="property" ref="dialogCreateProp" label-position="top">
        <el-form-item label="Наименование" prop="name">
          <el-input v-model="property.name" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCreatePropVisible = false">Отмена</el-button>
        <el-button type="primary" @click="createProperty"> Добавить </el-button>
      </span>
    </el-dialog>

    <!-- Machine type dialog -->
    <el-dialog title="Создать тип техники" :visible.sync="dialogMachineTypeVisible" width="80%">
      <el-form :model="machineType" ref="dialogCreateMachineType" label-position="top">
        <el-form-item label="Наименование" prop="name">
          <el-input v-model="machineType.name" />
        </el-form-item>
        <el-form-item label="Производитель" prop="brand">
          <el-select v-model="machineType.brandId" filterable class="w-full" no-data-text="Нет данных"
            no-match-text="Тип техники не найден" placeholder="Выберите тип техники">
            <el-option v-for="item in brands" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogMachineTypeVisible = false">Отмена</el-button>
        <el-button type="primary" @click="createMachineType">
          Добавить
        </el-button>
      </span>
    </el-dialog>

    <!-- Machine dialog -->
    <el-dialog title="Создать технику" :visible.sync="dialogMachineVisible" width="80%">
      <el-form :model="machine" ref="dialogCreateMachine" label-position="top">
        <el-form-item label="Наименование" prop="name">
          <el-input v-model="machine.name" />
        </el-form-item>
        <el-form-item label="Производитель" prop="brand">
          <el-select v-model="machine.brandId" filterable class="w-full" @change="selectBrandChange"
            no-data-text="Нет данных" no-match-text="Производитель не найден" placeholder="Выберите производителя">
            <el-option v-for="item in brands" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Тип" prop="type">
          <el-select v-model="machine.typeId" filterable class="w-full" no-data-text="Нет данных"
            no-match-text="Тип техники не найден" placeholder="Выберите тип техники"
            :disabled="!(dialogMachineTypesForBrand.length > 0)">
            <el-option v-for="item in dialogMachineTypesForBrand" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogMachineVisible = false">Отмена</el-button>
        <el-button type="primary" @click="createMachine"> Добавить </el-button>
      </span>
    </el-dialog>

    <!-- Props dialog -->
    <el-dialog title="Добавить свойство" :visible.sync="dialogPropertiesShow" append-to-body width="80%">
      <el-form :model="productProperty" ref="dialogProperties" label-position="top">
        <el-form-item label="Свойство" prop="property">
          <el-select v-model="productProperty.property" filterable class="w-full" value-key="id"
            no-data-text="Нет данных" no-match-text="Нет подходящих свойств" placeholder="Выберите свойство">
            <el-option v-for="item in properties" :key="item.id" :label="item.name" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Значение" prop="value">
          <el-input placeholder="Значение" v-model="productProperty.value"></el-input>
        </el-form-item>
        <el-form-item label="Дополнительно">
          <el-form :inline="true">
            <el-form-item>
              <el-checkbox v-model="productProperty.isDimension">
                Единица измерения?
              </el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-input :disabled="!productProperty.isDimension" v-model="productProperty.dimension"
                placeholder="Единица измерения"></el-input>
            </el-form-item>
          </el-form>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPropertiesShow = !dialogPropertiesShow">
          Отмена
        </el-button>
        <el-button type="primary" @click="addProductProperty">
          Добавить
        </el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { deepClone } from '~/helpers';

import ElButton from '@/node_modules/element-ui/lib/button'
import ElLink from '@/node_modules/element-ui/lib/link'
import ElForm from '@/node_modules/element-ui/lib/form'
import ElInput from '@/node_modules/element-ui/lib/input'
import ElFormItem from '@/node_modules/element-ui/lib/form-item'
import ElContainer from '@/node_modules/element-ui/lib/container'
import ElSelect from '@/node_modules/element-ui/lib/select'
import ElOption from '@/node_modules/element-ui/lib/option'
import ElTable from '@/node_modules/element-ui/lib/table'
import ElTableColumn from '@/node_modules/element-ui/lib/table-column'
import ElDropdown from '@/node_modules/element-ui/lib/dropdown'
import ElDropdownMenu from '@/node_modules/element-ui/lib/dropdown-menu'
import ElDropdownItem from '@/node_modules/element-ui/lib/dropdown-item'
import ElPageHeader from '@/node_modules/element-ui/lib/page-header'
import ElPagination from '@/node_modules/element-ui/lib/pagination'
import ElDrawer from '@/node_modules/element-ui/lib/drawer'
import ElUpload from '@/node_modules/element-ui/lib/upload'
import ElDialog from '@/node_modules/element-ui/lib/dialog'
import ElCheckbox from '@/node_modules/element-ui/lib/checkbox'

export default {
  middleware: 'auth',
  components: {
    ElButton, ElLink, ElForm, ElInput, ElFormItem,
    ElContainer, ElSelect, ElOption, ElTable, ElTableColumn, ElDropdownMenu,
    ElDropdown, ElDropdownItem, ElPageHeader, ElPagination, ElDrawer,
    ElUpload, ElDialog, ElCheckbox
  },
  computed: {
    ...mapGetters({
      products: 'products/getProducts',
      pagination: 'products/getPagination',
      product: 'products/getProduct',
      brands: 'brands/getBrands',
      machineTypes: 'machineTypes/getMachineTypes',
      machines: 'machines/getMachines',
      categories: 'products/getCategories',
      properties: 'api/products/properties/getProperties',
    }),
  },
  data() {
    return {
      drawer: {
        title: 'Добавить товар',
        isNew: true,
        isShow: false,
        isLoading: false
      },
      selectedMachineType: null,
      dialogPropertiesShow: false,
      productProperty: {
        id: '',
        value: '',
        isDimension: false,
        dimension: '',
        property: {},
      },
      form: {
        images: [],
        machines: [],
        properties: [],
        category: 1
      },
      rules: {

      },
      machineTypesForBrand: [],
      brand: {
        name: ''
      },
      machineType: {
        name: ''
      },
      machine: {
        name: '',
      },
      property: {
        name: '',
      },
      dialogBrandVisible: false,
      dialogMachineTypeVisible: false,
      dialogCreatePropVisible: false,
      dialogMachineTypesForBrand: [],
      dialogMachineVisible: false,
    }
  },
  methods: {
    handleDelete(row) {
      this.$confirm('Это действие удалит элемент без возможности восстановления. Продолжить?', 'Внимание', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Отмена',
        type: 'warning'
      }).then(async () => {
        try {
          await this.$store.dispatch('products/deleteSingleProduct', row)
          this.$notify({
            title: 'Выполнено',
            message: `Товар ${result.data.name} был удален`,
            type: 'success'
          });
        } catch (error) {
          this.$notify({
            title: 'Ошибка',
            message: error.message,
            type: 'error'
          });
        }
      }).catch(() => {
        this.$notify({
          title: 'Отмена',
          message: 'Операция Удалить отменена пользователем',
          type: 'info'
        });
      });
    },
    handleEdit(product) {
      this.form = deepClone(product)

      if (this.form.brand !== null)
        this.selectBrand(this.form.brand.id)
      if (this.form.type)
        this.selectMachineType(this.form.type.id)
      if (this.form.category)
        this.changeCategory(this.form.category.id)

      this.drawer.title = product.name
      this.drawer.isNew = false
      this.drawer.isShow = true
    },
    handleSelectionChange() { },
    showDrawer() {
      this.drawer.title = "Новый товар"
      this.drawer.isNew = true
      this.drawer.isShow = true
    },
    handleClose(done) {
      this.$confirm('Вы действительно хотите отменить операцию?', 'Отменить операцию', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Нет',
      })
        .then(_ => {
          this.resetForm()
          done();
        })
        .catch(_ => { });
    },
    resetForm() {
      this.form = {
        images: [],
        machines: [],
        properties: [],
        category: 1
      }
      this.$refs.createForm.resetFields()
    },
    addProperty() {
      const properties = deepClone(this.form.properties)
      properties.push({})
      this.form.properties = properties
    },

    handleCommand(command) {
      this[command] = true
    },

    async submitForm() {
      try {
        this.drawer.isLoading = true
        const data = await this.$store.dispatch('products/pushSingleProduct', this.form)
        const result = await data
        this.drawer.isLoading = false
        this.drawer.isShow = false
        this.resetForm()
        this.$notify({
          title: 'Выполнено',
          message: `Товар ${result.data.name} был добавлен`,
          type: 'success'
        });
      } catch (error) {
        this.drawer.isLoading = false
        this.$notify({
          title: 'Ошибка',
          message: error.message,
          type: 'error'
        });
      }
    },
    async updateForm() {
      //await this.$store.dispatch('products/updateSingleProduct', this.form)
      let data = deepClone(this.form)
      try {
        this.drawer.isLoading = true
        await this.$store.dispatch('products/updateSingleProduct', data)
        this.drawer.isLoading = false
        this.drawer.isShow = false
        this.$notify({
          title: 'Выполнено',
          message: `Товар ${this.form.name} был обновлен`,
          type: 'success'
        });
        this.resetForm()
      } catch (error) {
        this.drawer.isLoading = true
        this.$notify({
          title: 'Ошибка',
          message: error.message,
          type: 'error'
        });
      }
    },

    async paginationCurrentChange(page) {
      const params = { page: page }
      await this.$store.dispatch('products/fetchProductsByFilter', params)
      window.scrollTo(0, 0)
    },

    addProductProperty() {
      this.productProperty.id = this.product.properties.length
      this.productProperty.id++
      const property = Object.assign({}, this.productProperty)
      this.form.properties.push(property)
      this.$store.commit('products/pushProperty', property)
      this.dialogPropertiesShow = false
      this.$refs.dialogProperties.resetFields();
    },

    sendDataProductToUpload() {
      this.$store.dispatch('products/pushSingleProduct', this.form)
    },

    async selectBrand(brandId) {
      let params = { brand: brandId }
      let data = await this.$axios.get('/machines-types', { params })
      let result = await data
      this.machineTypesForBrand = result.data.data

      this.form.brand = brandId
    },

    selectMachineType(machineTypeId) {
      if (!this.form.machines)
        this.form.machines = []
      this.$store.dispatch(
        'machines/fetchSingleMachineForMachineType',
        machineTypeId
      )
      this.form.type = machineTypeId
    },
    changeCategory(value) {
      this.form.category = value
    },

    handleRemoveProductImage(file) {
      let files = Object.assign([], this.form.images)

      files.forEach((img, index) => {
        if (!img.raw) {
          if (img.uid === file.uid) {
            files.splice(index, 1)
          }
          return
        }
        if (img.raw.uid === file.raw.uid) {
          files.splice(index, 1)
        }
      })

      this.form.images = files
    },
    onChangeUploaderProductImages(file, fileList) {
      let files = Object.assign([], this.form.images)
      if (!files)
        this.form.images = []
      if (file)
        files.push(file)
      this.form.images = files
    },

    createBrand() {
      this.$store.dispatch('brands/postSingleBrand', this.brand)
      this.dialogBrandVisible = false
      this.$refs.dialogCreateBrand.resetFields();
    },
    createProperty() {
      this.$store.dispatch('api/products/properties/postSingleProperty', this.property)
      this.dialogCreatePropVisible = false
      this.$refs.dialogCreateProp.resetFields();
    },
    createMachineType() {
      this.$store.dispatch('machineTypes/postSingleMachineType', this.machineType)
      this.dialogMachineTypeVisible = false
      this.$refs.dialogCreateMachineType.resetFields();
    },
    createMachine() {
      this.$store.dispatch('machines/postSingleMachine', this.machine)
      this.dialogMachineVisible = false
      this.$refs.dialogCreateMachine.resetFields();
    },
    async selectBrandChange(brand) {
      let params = { brand: brand }
      let data = await this.$axios.get('/machines-types', { params })
      let result = await data
      this.dialogMachineTypesForBrand = result.data.data
    }

  },
  async fetch() {
    await this.$store.dispatch('products/fetchProductsByFilter')
  },
  fetchOnServer: false,
  mounted() {
    if (!this.products.length)
      this.$store.dispatch('products/fetchProductsByFilter')
    if (!this.brands.length)
      this.$store.dispatch('brands/fetchAllBrands')
    if (!this.machineTypes.length)
      this.$store.dispatch('machineTypes/fetchAllMachineTypes')
    if (!this.categories.length)
      this.$store.dispatch('products/fetchAllCategories')
    if (!this.properties.length)
      this.$store.dispatch('api/products/properties/fetchAllProperties')
  },
}
</script>

<style>
</style>
