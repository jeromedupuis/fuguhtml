import _ from 'lodash';

export default {
  methods: {
    getFiredata(doc) {
      return {
        id: doc.id,
        ...doc.data()
      };
    },
    getFiredocs(snapshot) {
      let data = [];

      if(snapshot.empty) {
        return data;
      }
      let docs = snapshot.docs;
      if(_.isEmpty(docs)) {
        return data;
      }
      docs.map((doc) => {
        data.push(this.getFiredata(doc));
      });
      return data;
    }
  }
};
