import Vue from 'vue'
import('~/assets/css/element-index.scss')

import ElSkeleton from '~/node_modules/element-ui/lib/skeleton'
import ElSkeletonItem from '~/node_modules/element-ui/lib/skeleton-item'
import ElNotification from '~/node_modules/element-ui/lib/notification'
import ElMessage from '~/node_modules/element-ui/lib/message'

Vue.component(ElSkeletonItem.name, ElSkeletonItem)
Vue.component(ElSkeleton.name, ElSkeleton)

Vue.prototype.$notify = ElNotification;
Vue.prototype.$message = ElMessage;
