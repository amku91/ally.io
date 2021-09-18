
/**
 * @name mapParentandChildOkrs
 * @description This helper method can be used to map parent and child okr
 * @param {*} okrData OKR dat array received from server
 * @returns Mapped Okrs in this format {parent: {child}}
 */
export const mapParentandChildOkrs = (okrData) => {
    if (Array.isArray(okrData)) {
        //Algo
        //1. Create a hash table and maintain parent refence in that along with every record hash map allHashTable
        //2. Now build an array contiang parent node data and his child nodes
        const hashTable = Object.create(null);
        const allHashTable = Object.create(null);
        const returnArray = [];
        okrData.forEach(parentData => {
            if (!allHashTable[parentData.id]) {
                allHashTable[parentData.id] = parentData;
            }
            //map child nodes also
            if (parentData.parent_objective_id && !hashTable[parentData.parent_objective_id]) {
                hashTable[parentData.parent_objective_id] = [parentData];
            } else if (parentData.parent_objective_id) {
                hashTable[parentData.parent_objective_id] = [...hashTable[parentData.parent_objective_id], ...[parentData]];
            }
        });
        //loop for hashTable to assign self data
        for (let key in hashTable) {
            if (allHashTable[key]) {
                allHashTable[key]['childNodes'] = hashTable[key];
                Object.defineProperty(allHashTable[key], 'childNodes', hashTable[key]);
                //, ...Object.create({childNodes: hashTable[key]) 
                returnArray.push({ ...allHashTable[key] });
            }
        }
        return returnArray;
    } else {
        return [];
    }
};

/**
 * @name getListLetterForOkr
 * @description To convert list numeric number to string 
 * @param {*} mode parent | child
 * @param {*} orderKey 0 to n
 */
export const getListLetterForOkr = (mode, orderKey) => {
    return (mode === 'parent' ? (Number(orderKey) + 1) : String.fromCharCode(97 + orderKey));
};

/**
 * @name applyFilterLogic
 * @description This helper method filter OKR data based on a given filter. Return okr data if no filter given
 * @param {*} okrData 
 * @param {*} filter 
 * @returns Category OKR data
 */
export const applyFilterLogic = (okrData, filter) => {
    //Algo. 
    //1. first filter category who belong to selected category
    //2 no filter child nodes
    if (filter) {
        okrData = okrData.filter(parent => parent.category === filter);
        okrData = okrData.map(parent => {
            if (Array.isArray(parent.childNodes)) {
                let childNodes = parent.childNodes.filter(child => child.category === filter);
                Object.defineProperty(parent, 'childNodes', childNodes);

            }
            return parent;
        });
    }
    return okrData;

};