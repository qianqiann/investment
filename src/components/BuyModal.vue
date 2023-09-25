<template>
  <div class="main">
    <div class="category">
      <div class="form">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group
            id="input-group-1"
            label="Fund Name:"
            label-for="input-1"
          >
            <b-form-input
              type="text"
              id="input-1"
              v-model="form.fundName"
              :disabled="true"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            :label="showLabel"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.addTotal"
              type="number"
              :state="validation"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validation">
              {{
                ` Minimum Value is ${
                  info.currentTotalUnits > 0
                    ? info.minimumAdditional
                    : info.minimumInvestment
                } ${info.currency}`
              }}
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Total Units (After)"
            label-for="input-1"
          >
            <b-form-input
              type="number"
              id="input-1"
              v-model="form.currentTotalUnits"
              :disabled="true"
            ></b-form-input>
          </b-form-group>

          <div class="button_main">
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </div>
        </b-form>
      </div>
      <div class="info">
        <div class="info_detail">
          <div>
            {{ `Current Value: ${info.currency} ${info.currentNetAsset}` }}
          </div>
          <div>
            {{
              `Minimum Investment: ${info.currency} ${info.minimumInvestment}`
            }}
          </div>
          <div>
            {{
              `Minimum Additional Investment: ${info.currency} ${info.minimumAdditional}`
            }}
          </div>
          <div>{{ `Minimum Units: ${info.minimumUnits} units` }}</div>
        </div>
      </div>
    </div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="success"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      <p>This alert will dismiss after {{ dismissCountDown }} seconds...</p>
      <b-progress
        variant="warning"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>
  </div>
</template>

<script>
import { getBuyInfo } from '../service/rest.js';
export default {
  props: {
    activeBuyModel: { default: null },
  },
  data: () => ({
    info: {},
    dismissSecs: 5,
    dismissCountDown: 0,
    form: {
      fundId: null,
      fundName: '',
      addTotal: 0,
      currentTotalUnits: 0,
    },
  }),
  computed: {
    showLabel() {
      return this.currentTotalUnit <= 0
        ? `New Investment (${this.info.currency})`
        : `Top Up (${this.info.currency})`;
    },
    validation() {
      return this.info.currentTotalUnit > 0
        ? this.form.addTotal >= this.info.minimumAdditional
        : this.form.addTotal >= this.info.minimumInvestment;
    },
  },
  async mounted() {
    if (this.activeBuyModel) {
      const resp = await getBuyInfo(this.activeBuyModel.id);
      if (resp.code == 200) {
        this.info = resp.data;
        this.form.fundId = this.info.id;
        this.form.fundName = this.info.fundName;
        this.form.addTotal =
          this.info.currentTotalUnit <= 0
            ? this.info.minimumInvestment
            : this.info.minimumAdditional;
        this.form.currentTotalUnits = this.info.currentTotalUnit;
      }
    } else {
    }
  },
  watch: {
    'form.addTotal'() {
      let addedUnits = (this.form.addTotal * this.info.currentNetAsset).toFixed(
        4
      );
      let sumUp = parseInt(this.info.currentTotalUnit) + parseInt(addedUnits);
      this.form.currentTotalUnits = parseInt(sumUp).toFixed(4);
    },
  },
  methods: {
    async onSubmit() {
      if (!this.validation) {
        return;
      }
      const resp = await updateList(this.form);
      if (resp.code == 200) {
        this.dismissCountDown = this.dismissSecs;
      }
    },
    onReset(event) {
      event.preventDefault();
      this.form.addTotal = 0;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
  },
};
</script>

<style scoped>
.main {
  padding: 5px;
}

.category {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 3%;
}

.info {
  border: 1px solid grey;
  padding: 5px;
}

.info_detail {
  display: flex;
  flex-direction: column;
}

.button_main {
  padding-top: 2%;
  display: flex;
  gap: 2%;
}
</style>
