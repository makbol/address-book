describe('Db', () => {

  let ids = {
    add: null,
    toRemove: null
  }

  before(() => {
    db.init('test');
    ids.add = db.add({name: 'John'});
    ids.toRemove = db.add({name: 'Should be removed'});
  });

  it('should have added item', () => {
    expect(db.get(ids.add).name).to.equal('John');
  });

  it('should keep data in localStorage', () => {
    let lsRecord = localStorage.getItem('test');
    expect(lsRecord.length).to.be.ok;
  });

  it('should call listener when data was added', () => {
    let listener = sinon.spy();
    db.addListener(listener);
    db.add({name: 'James'});
    expect(listener.called).to.be.ok;
  });

  it('should correctly remove item', () => {
    db.remove(ids.toRemove);
    let stored = JSON.parse(localStorage.getItem('test') || {});
    expect(db.get(ids.toRemove)).to.be.undefined;
    expect(stored[ids.toRemove]).to.be.undefined;
    expect(Object.keys(stored).length).to.equal(2);
  });

});
