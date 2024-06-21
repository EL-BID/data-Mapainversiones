from dataflows import Flow, load, dump_to_path, add_metadata,update_resource

def dataset1_process():
    flow = Flow(
        load("datasets/dataset-1/data/BID_Base_Cla_end_mip.csv", format='csv', name="bid_base_cla_end_mip"),
        update_resource('bid_base_cla_end_mip', path='data/bid_base_cla_end_mip.csv'),
        add_metadata(name='bid_base_cla_end_mip', title='bid_base_cla_end_mip', country='Dominican Republic'),
        #dump_to_path(out_path="datasets/dataset-1/")
    )
    flow.process()
    
if __name__ == '__main__':
    dataset1_process()